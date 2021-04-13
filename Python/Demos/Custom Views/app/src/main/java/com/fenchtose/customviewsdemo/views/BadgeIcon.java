package com.fenchtose.customviewsdemo.views;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.os.Build;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.AttributeSet;
import android.widget.ImageView;

import com.fenchtose.customviewsdemo.R;


/**
 * Created by Jay Rambhia on 03/12/15.
 */
public class BadgeIcon extends ImageView {

    public static final int TOP_LEFT = 1;
    public static final int TOP_RIGHT = 2;
    public static final int BOTTOM_RIGHT = 3;
    public static final int BOTTOM_LEFT = 4;
    public static final int TOP_CENTER = 5;
    public static final int RIGHT_CENTER = 6;
    public static final int BOTTOM_CENTER = 7;
    public static final int LEFT_CENTER = 8;
    public static final int CENTER = 9;

    private static final int DEFAULT_BADGE_TEXT_COLOR = 0xffff0000;
    private static final int DEFAULT_BADGE_BG_COLOR = 0xff00ff00;
    private static final int DEFAULT_BADGE_PADDING = 4;
    private static final int DEFAULT_BADGE_TEXT_SIZE = 18;
    private static final int DEFAULT_BADGE_MARGIN = 0;

    private static final String TAG = "IconBadge";
    private Paint mBackgroundPaint;
    private TextPaint mPaint;
    private StaticLayout mTextLayout;
    private CharSequence mBadgeText;
    private CharSequence mNewText;

    private int mBadgeTextSize = DEFAULT_BADGE_TEXT_SIZE;
    private int mBadgeTextColor = DEFAULT_BADGE_TEXT_COLOR;
    private int mBadgeBackgroundColor = DEFAULT_BADGE_BG_COLOR;
    private int mBadgePadding = DEFAULT_BADGE_PADDING;
    private int mBadgePosition = TOP_RIGHT;
    private int mPrevBadgeTextSize = DEFAULT_BADGE_TEXT_SIZE;
    private int mLeftMargin = DEFAULT_BADGE_MARGIN;
    private int mRightMargin = DEFAULT_BADGE_MARGIN;
    private int mTopMargin = DEFAULT_BADGE_MARGIN;
    private int mBottomMargin = DEFAULT_BADGE_MARGIN;

    public BadgeIcon(Context context) {
        super(context);
        init(context, null);
    }

    public BadgeIcon(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public BadgeIcon(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public BadgeIcon(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {

        if (attrs != null) {
            TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.BadgeIcon);
            mBadgePosition = a.getInteger(R.styleable.BadgeIcon_badgePosition, TOP_LEFT);
            mBadgeBackgroundColor = a.getColor(R.styleable.BadgeIcon_badgeBackgroundColor, DEFAULT_BADGE_BG_COLOR);
            mBadgePadding = a.getDimensionPixelOffset(R.styleable.BadgeIcon_badgeTextPadding, DEFAULT_BADGE_PADDING);
            mBadgeTextColor = a.getColor(R.styleable.BadgeIcon_badgeTextColor, DEFAULT_BADGE_TEXT_COLOR);
            mBadgeTextSize = a.getDimensionPixelSize(R.styleable.BadgeIcon_badgeTextSize, DEFAULT_BADGE_TEXT_SIZE);
            mBadgeText = a.getText(R.styleable.BadgeIcon_badgeText);
            mLeftMargin = a.getDimensionPixelOffset(R.styleable.BadgeIcon_badgeMarginLeft, DEFAULT_BADGE_MARGIN);
            mRightMargin = a.getDimensionPixelOffset(R.styleable.BadgeIcon_badgeMarginRight, DEFAULT_BADGE_MARGIN);
            mTopMargin = a.getDimensionPixelOffset(R.styleable.BadgeIcon_badgeMarginTop, DEFAULT_BADGE_MARGIN);
            mBottomMargin = a.getDimensionPixelOffset(R.styleable.BadgeIcon_badgeMarginBottom, DEFAULT_BADGE_MARGIN);

            if (a.hasValue(R.styleable.BadgeIcon_badgeMargin)) {
                int margin = a.getDimensionPixelOffset(R.styleable.BadgeIcon_badgeMargin, DEFAULT_BADGE_MARGIN);
                mLeftMargin = margin;
                mRightMargin = margin;
                mBottomMargin = margin;
                mTopMargin = margin;
            }

            a.recycle();
        }

        mPaint = new TextPaint();
        mPaint.setTextSize(mBadgeTextSize);
        mPaint.setAntiAlias(true);
        mPaint.setColor(mBadgeTextColor);

        mBackgroundPaint = new Paint();
        mBackgroundPaint.setColor(mBadgeBackgroundColor);
        mBackgroundPaint.setAntiAlias(true);
        mBackgroundPaint.setStyle(Paint.Style.FILL);

        mPrevBadgeTextSize = mBadgeTextSize;

        if (isInEditMode()) {
            setBadgeText("2");
        }
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int width = MeasureSpec.getSize(widthMeasureSpec);

        // Create a layout for sub-text.
        if (mNewText != null && !mNewText.equals(mBadgeText)) {
            mBadgeText = mNewText;
            generateNewStaticLayout(width);

        } else if (mPrevBadgeTextSize != mBadgeTextSize) {
            // change in text size
            generateNewStaticLayout(width);
            mPrevBadgeTextSize = mBadgeTextSize;
        }
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    private void generateNewStaticLayout(int width) {
        mTextLayout = new StaticLayout(
                mBadgeText,
                mPaint,
                width,
                Layout.Alignment.ALIGN_NORMAL,
                1.0f,
                0.0f,
                true);
    }

    public void setBadgeText(CharSequence text) {

        if (text == null) {
            return;
        }

        int width = getMeasuredWidth();
        if (width == 0) {
            mNewText = text;
            return;
        }

        boolean change = true;

        if (mTextLayout != null) {
            if (mBadgeText != null && mBadgeText.equals(text)) {
                change = false;
            }
        }

        mBadgeText = text;
        if (change) {
            generateNewStaticLayout(width);
            mNewText = mBadgeText;
            requestLayout();
            invalidate();
        }
    }

    @Override
    public void onDraw(Canvas c) {
        super.onDraw(c);

        if (mTextLayout != null && mBadgeText != null && mBadgeText.length() != 0) {

            int w = (int)mTextLayout.getLineWidth(0);
            int b = mTextLayout.getLineBottom(0);
//            Log.i(TAG, w + ", " + b + ", " + mBadgePosition);
            c.save();

            int d = Math.max(w, b);
            if (d % 2 == 1) {
                d += 1;
            }

            int cx = c.getWidth()/2;
            int cy = c.getHeight()/2;

            /*int paddingRight = getPaddingRight();
            int paddingLeft = getPaddingLeft();
            int paddingBottom = getPaddingBottom();
            int paddingTop = getPaddingTop();*/

            int paddingRight = mRightMargin;
            int paddingLeft = mLeftMargin;
            int paddingBottom = mBottomMargin;
            int paddingTop = mTopMargin;

            /*paddingRight = 0;
            paddingLeft = 0;
            paddingTop = 0;
            paddingBottom = 0;*/

            if (mBadgePosition == TOP_RIGHT) {
                cx = c.getWidth() - paddingRight - (d / 2 + mBadgePadding);
                cy = paddingTop + (d / 2 + mBadgePadding);
            } else if (mBadgePosition == TOP_LEFT) {
                cx = paddingLeft + (d/2 + mBadgePadding);
                cy = paddingTop + (d / 2 + mBadgePadding);
            } else if (mBadgePosition == BOTTOM_LEFT) {
                cx = paddingLeft+ (d/2 + mBadgePadding);
                cy = c.getHeight() - paddingBottom - (d / 2 + mBadgePadding);
            } else if (mBadgePosition == BOTTOM_RIGHT) {
                cx = c.getWidth() - paddingRight - (d / 2 + mBadgePadding);
                cy = c.getHeight() - paddingBottom - (d / 2 + mBadgePadding);
            } else if (mBadgePosition == LEFT_CENTER) {
                cx = paddingLeft + (d/2 + mBadgePadding);
                cy = c.getHeight()/2;
            } else if (mBadgePosition == RIGHT_CENTER) {
                cx = c.getWidth() - paddingRight - (d / 2 + mBadgePadding);
                cy = c.getHeight()/2;
            } else if (mBadgePosition == TOP_CENTER) {
                cx = c.getWidth()/2;
                cy = paddingTop + (d / 2 + mBadgePadding);
            } else if (mBadgePosition == BOTTOM_CENTER) {
                cx = c.getWidth()/2;
                cy = c.getHeight() - paddingBottom - (d / 2 + mBadgePadding);
            }

            int l = cx - (w / 2);
            int t = cy - (b / 2);

            c.drawCircle(cx, cy, d/2 + mBadgePadding, mBackgroundPaint);

            c.translate(l, t);
            mTextLayout.draw(c);
            c.restore();
        }
    }

    public void setBadgeTextSize(int mBadgeTextSize) {

        if (this.mBadgeTextSize == mBadgeTextSize) {
            // no change
            return;
        }

        this.mBadgeTextSize = mBadgeTextSize;
        mPaint.setTextSize(mBadgeTextSize);

        int width = getMeasuredWidth();
        if (width == 0) {
            return;
        }

        mTextLayout = new StaticLayout(mBadgeText, mPaint, width,
                Layout.Alignment.ALIGN_NORMAL, 1.0f, 0.0f, true);
        mPrevBadgeTextSize = mBadgeTextSize;
        requestLayout();
        invalidate();
    }

    public void setBadgeTextColor(int mBadgeTextColor) {
        if (this.mBadgeTextColor == mBadgeTextColor) {
            // no change
            return;
        }

        this.mBadgeTextColor = mBadgeTextColor;
        mPaint.setColor(mBadgeTextColor);
        invalidate();
    }

    public void setBadgeBackgroundColor(int mBadgeBackgroundColor) {
        if (this.mBadgeBackgroundColor == mBadgeBackgroundColor) {
            // no change
            return;
        }

        this.mBadgeBackgroundColor = mBadgeBackgroundColor;
        invalidate();
    }

    public void setBadgePadding(int mBadgePadding) {
        if (this.mBadgePadding == mBadgePadding) {
            // no change
            return;
        }
        this.mBadgePadding = mBadgePadding;
        invalidate();
    }

    public void setBadgePosition(int position) {
        if (this.mBadgePosition == position) {
            // no change
            return;
        }
        this.mBadgePosition = position;
        invalidate();
    }

    public void setLeftMargin(int mLeftMargin) {
        this.mLeftMargin = mLeftMargin;
        invalidate();
    }

    public void setRightMargin(int mRightMargin) {
        this.mRightMargin = mRightMargin;
        invalidate();
    }

    public void setTopMargin(int mTopMargin) {
        this.mTopMargin = mTopMargin;
        invalidate();
    }

    public void setBottomMargin(int mBottomMargin) {
        this.mBottomMargin = mBottomMargin;
        invalidate();
    }

    public void setMargin(int margin) {
        mTopMargin = margin;
        mBottomMargin = margin;
        mLeftMargin = margin;
        mRightMargin = margin;
        invalidate();
    }
}
