package com.fenchtose.customviewsdemo.views;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.os.Build;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.AttributeSet;
import android.widget.TextView;

import com.fenchtose.customviewsdemo.R;

/**
 * Created by Jay Rambhia on 28/11/15.
 */
public class VerticalTwoTextView extends TextView {

    private final String TAG = getClass().getSimpleName();
    private Layout mSubTextLayout;
    private CharSequence mSubText;
    private TextPaint mSubTextPaint;

    private CharSequence mNewText;

    private final int DEFAULT_SUBTEXT_COLOR = 0xff000000;
    private final int DEFAULT_SUBTEXT_SIZE = 16;
    private final int DEFAULT_TOP_MARGIN = 8; //dp

    private int mSubTextColor = DEFAULT_SUBTEXT_COLOR;
    private int mSubTextSize = DEFAULT_SUBTEXT_SIZE;
    private int mSubTextTopMargin = DEFAULT_TOP_MARGIN;

    private int mPrevWidth = -1;

    public VerticalTwoTextView(Context context) {
        super(context);
        init(context, null);
    }

    public VerticalTwoTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public VerticalTwoTextView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public VerticalTwoTextView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        mSubTextPaint = new TextPaint();
        mSubTextPaint.setAntiAlias(true);
        mSubTextPaint.setTypeface(getTypeface());

        float density = context.getResources().getDisplayMetrics().density;

        if (attrs != null) {
            TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.VerticalTwoTextView);
            mSubTextColor = a.getColor(R.styleable.VerticalTwoTextView_subtextColor, DEFAULT_SUBTEXT_COLOR);
            mSubTextSize = a.getDimensionPixelSize(R.styleable.VerticalTwoTextView_subtextSize, DEFAULT_SUBTEXT_SIZE);
            mSubTextTopMargin = a.getDimensionPixelOffset(R.styleable.VerticalTwoTextView_subtextTopMargin,
                    (int) (DEFAULT_TOP_MARGIN * density));
            mSubText = a.getString(R.styleable.VerticalTwoTextView_subtext);
            a.recycle();
        } else {
            mSubTextTopMargin = (int)(DEFAULT_TOP_MARGIN * density);
        }

        mSubTextPaint.setColor(mSubTextColor);
        mSubTextPaint.setTextSize(mSubTextSize);

        if (isInEditMode()) {
            setSubText("Sub Text");
        }
    }

    @Override
    public int getCompoundPaddingBottom() {
        // the layout has only one line
        if (mSubTextLayout != null) {
            return super.getCompoundPaddingBottom() + mSubTextLayout.getHeight() + mSubTextTopMargin;
        }

        return super.getCompoundPaddingBottom();
    }



    @Override
    public void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        // TextView doesn't know about mSubTextLayout.
        // It calculates the space using compound drawables' sizes.
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

//        int width = MeasureSpec.getSize(widthMeasureSpec);

        int width = getMeasuredWidth();

        boolean changeRequired = false;
        if (mPrevWidth != width) {
            mPrevWidth = width;
            changeRequired = true;
        }

        // Create a layout for sub-text.
        if (mNewText != null && !mNewText.equals(mSubText)) {
            mSubText = mNewText;
            if (!changeRequired) {
                changeRequired = true;
            }
        }

        if (mSubText != null && changeRequired) {
            mSubTextLayout = new StaticLayout(
                    mSubText,
                    mSubTextPaint,
                    width,
                    Layout.Alignment.ALIGN_NORMAL,
                    1.0f,
                    0.0f,
                    true);
        }

        if (mSubTextLayout != null && mSubTextLayout.getWidth() > width) {
            widthMeasureSpec = MeasureSpec.makeMeasureSpec(width, MeasureSpec.getMode(widthMeasureSpec));
            setMeasuredDimension(widthMeasureSpec, heightMeasureSpec);
        }

    }

    public void setSubText(CharSequence text) {

        if (text == null) {
            return;
        }

        int width = Math.max(getMeasuredWidth(), getWidth());
//        Log.i(TAG, "width: " + width);
        if (width == 0) {
            mNewText = text;
            return;
        }

        boolean change = true;

        if (mSubTextLayout != null) {
            if (mSubText != null && mSubText.equals(text)) {
                change = false;
            }

        }

        mSubText = text;
        if (change) {
            mSubTextLayout = null;
            mSubTextLayout = new StaticLayout(mSubText, mSubTextPaint, width,
                    Layout.Alignment.ALIGN_NORMAL, 1.0f, 0.0f, true);
            mNewText = mSubText;
            requestLayout();
            invalidate();
        }
    }

    public void setSubTextTopMargin(int margin) {
        if (mSubTextTopMargin == margin) {
            // no change
            return;
        }

        mSubTextTopMargin = margin;
        requestLayout();
    }

    @Override
    public void onDraw(Canvas c) {
        super.onDraw(c);

        if (mSubTextLayout != null) {
            c.save();
            c.translate(0,  c.getHeight() - mSubTextLayout.getHeight() - getPaddingBottom());
            mSubTextLayout.draw(c);
            c.restore();
        }
    }

    public void setSubTextColor(int mSubTextColor) {
        this.mSubTextColor = mSubTextColor;
        mSubTextPaint.setColor(mSubTextColor);
        invalidate();
    }

    public void setSubTextSize(int mSubTextSize) {
        this.mSubTextSize = mSubTextSize;
        mSubTextPaint.setTextSize(mSubTextSize);
        invalidate();
    }
}
