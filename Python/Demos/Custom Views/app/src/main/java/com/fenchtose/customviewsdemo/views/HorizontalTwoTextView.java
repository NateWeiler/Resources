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
import android.view.Gravity;
import android.widget.TextView;

import com.fenchtose.customviewsdemo.R;

/**
 * Created by Jay Rambhia on 28/11/15.
 */
public class HorizontalTwoTextView extends TextView {

    private final String TAG = getClass().getSimpleName();
    private Layout mSubTextLayout;
    private CharSequence mSubText;
    private TextPaint mSubTextPaint;

    private CharSequence mNewText;

    private final int DEFAULT_SUBTEXT_COLOR = 0xff000000;
    private final int DEFAULT_SUBTEXT_SIZE = 16;

    private int mSubTextColor = DEFAULT_SUBTEXT_COLOR;
    private int mSubTextSize = DEFAULT_SUBTEXT_SIZE;

    public HorizontalTwoTextView(Context context) {
        super(context);
        init(context, null);
    }

    public HorizontalTwoTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public HorizontalTwoTextView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public HorizontalTwoTextView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        mSubTextPaint = new TextPaint();
        mSubTextPaint.setAntiAlias(true);
        mSubTextPaint.setTypeface(getTypeface());

        if (attrs != null) {
            TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.HorizontalTwoTextView);
            mSubTextColor = a.getColor(R.styleable.HorizontalTwoTextView_subtextColor, DEFAULT_SUBTEXT_COLOR);
            mSubTextSize = a.getDimensionPixelSize(R.styleable.HorizontalTwoTextView_subtextSize, DEFAULT_SUBTEXT_SIZE);
            mSubText = a.getString(R.styleable.HorizontalTwoTextView_subtext);
            a.recycle();
        }

        mSubTextPaint.setColor(mSubTextColor);
        mSubTextPaint.setTextSize(mSubTextSize);

        if (isInEditMode()) {
            setSubText("Sub Text");
        }

        if (mSubText != null) {
            setSubText(mSubText);
        }
    }

    @Override
    public int getCompoundPaddingRight() {
        // the layout has only one line
        if (mSubTextLayout != null) {
            return (int)(super.getCompoundPaddingRight() + mSubTextLayout.getLineWidth(0));
        }

        return super.getCompoundPaddingRight();
    }

    @Override
    public void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int width = MeasureSpec.getSize(widthMeasureSpec);

        // Create a layout for sub-text.

        // Check if subText is updated or not.
        if (mNewText != null && !mNewText.equals(mSubText)) {
            mSubText = mNewText;
            mSubTextLayout = new StaticLayout(
                    mSubText,
                    mSubTextPaint,
                    width,
                    Layout.Alignment.ALIGN_NORMAL,
                    1.0f,
                    0.0f,
                    true);

        }


        // TextView doesn't know about mSubTextLayout.
        // It calculates the space using compound drawables' sizes.
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    public void setSubText(CharSequence text) {
        if (text == null) {
            return;
        }

        int width = getMeasuredWidth();

        // if width is 0, it is possible that view is not drawn yet. Do not create subtextLayout just yet.
        if (width == 0) {
            mNewText = text;
            return;
        }

        boolean change = true;

        if (mSubTextLayout != null) {

            // We don't need to create new StaticLayout if the text has not changed
            if (mSubText != null && mSubText.equals(text)) {
                change = false;
            }
        }

        mSubText = text;
        if (change) {
            mSubTextLayout = new StaticLayout(mSubText, mSubTextPaint, width,
                    Layout.Alignment.ALIGN_NORMAL, 1.0f, 0.0f, true);
            mNewText = mSubText;
            requestLayout();
            invalidate();
        }
    }

    @Override
    public void onDraw(Canvas c) {
        super.onDraw(c);

        if (mSubTextLayout != null) {

            int w = (int)mSubTextLayout.getLineWidth(0);
            c.save();

            int top = getPaddingTop();

            // If TextView gravity is center or center_vertical, place sublayout vertically centered
            int gravity = getGravity() & Gravity.VERTICAL_GRAVITY_MASK;
            if (gravity == Gravity.CENTER_VERTICAL || gravity == Gravity.CENTER) {
                top = c.getHeight()/2 - mSubTextLayout.getHeight()/2;
            }

            c.translate(c.getWidth() - w - getPaddingRight(), top);
            mSubTextLayout.draw(c);
            c.restore();
        }
    }
}
