package com.fenchtose.customviewsdemo.views;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.res.TypedArray;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;

/**
 * Created by Jay Rambhia on 21/12/15.
 */
public class FlowLayout extends ViewGroup {
    private static final String TAG = "FlowLayout";

    private static final int DEFAULT_ITEM_MARGIN = 12;
    private int mItemMargin;

    private int mParentWidth = 0;

    public FlowLayout(Context context) {
        super(context);
        init(context, null);
    }

    public FlowLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public FlowLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public FlowLayout(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        float density = getResources().getDisplayMetrics().density;
        mItemMargin = (int)(DEFAULT_ITEM_MARGIN * density);

        if (attrs != null) {
            TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.FlowLayout);
            mItemMargin = a.getDimensionPixelOffset(R.styleable.FlowLayout_item_spacing, mItemMargin);
            a.recycle();
        }
    }

    public void addItem(View child) {
        LayoutParams params = new LayoutParams(LayoutParams.WRAP_CONTENT,
                LayoutParams.WRAP_CONTENT);
//        params.setMargins(mItemMargin, mItemMargin, mItemMargin, mItemMargin);
        addView(child, params);
    }

    public void addItem(View child, LayoutParams params) {
        addView(child, params);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

        int width = getMeasuredWidth();
        int height = getMeasuredHeight();

        int wMode = MeasureSpec.getMode(widthMeasureSpec);
        if (wMode == MeasureSpec.AT_MOST) {
            View parent = (View) getParent();
            if (parent != null) {
                Log.i(TAG, "get parent width: " + parent.getMeasuredWidth());
                width = parent.getMeasuredWidth();
                if (width == 0) {
                    ViewTreeObserver viewTreeObserver = getViewTreeObserver();
                    if (viewTreeObserver.isAlive()) {
                        viewTreeObserver.addOnGlobalLayoutListener(mGlobalLayoutListener);
                    }
                }
            }
        }

        int availableWidth = width - getPaddingLeft() - getPaddingRight();

        int currentMeasuringWidth = 0;

        int maxWidth = 0;
        int prevLineLastChildHeight = 0;
        int prevChildHeight = 0;

        int finalHeight = 0;

        for (int i=0; i<getChildCount(); i++) {
            View child = getChildAt(i);

            measureChild(child, widthMeasureSpec, heightMeasureSpec);

            int cWidth = child.getMeasuredWidth() + 2 * mItemMargin;
            int cHeight = child.getMeasuredHeight() + 2 * mItemMargin;

//            Log.i(TAG, "cWidth: " + cWidth);
//            Log.i(TAG, "cHeight: " + child.getMeasuredHeight());

            if (cWidth + currentMeasuringWidth > availableWidth) {
                // Width is insufficient.
                // check and add more height if required
                currentMeasuringWidth = 0;
                prevLineLastChildHeight = prevChildHeight;
                finalHeight += prevLineLastChildHeight;

            }

            currentMeasuringWidth += cWidth;

            if (currentMeasuringWidth > maxWidth) {
                maxWidth = currentMeasuringWidth;
            }

            prevChildHeight = cHeight;
        }

        finalHeight += prevChildHeight;

        if (wMode == MeasureSpec.AT_MOST && maxWidth != 0) {
            widthMeasureSpec = MeasureSpec.makeMeasureSpec(maxWidth, MeasureSpec.EXACTLY);
        }

        if (finalHeight > height) {
            heightMeasureSpec = MeasureSpec.makeMeasureSpec(finalHeight, MeasureSpec.EXACTLY);
        } else {
            if (MeasureSpec.getMode(heightMeasureSpec) == MeasureSpec.AT_MOST) {
                heightMeasureSpec = MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY);
            }
        }

        setMeasuredDimension(widthMeasureSpec, heightMeasureSpec);

    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {

        int availableWidth = getMeasuredWidth() - getPaddingLeft() - getPaddingRight();

        int currentLinePrevChildRight = 0;
        int prevLineHeight = 0;
        int prevChildHeight = 0;

        for(int i=0; i<getChildCount(); i++) {
            View child = getChildAt(i);

            int cl = currentLinePrevChildRight + mItemMargin;
            if (cl + child.getMeasuredWidth() > availableWidth) {
                // put in new line
                currentLinePrevChildRight = 0;
                cl = currentLinePrevChildRight + mItemMargin;
                prevLineHeight += prevChildHeight;
            }

            int ct = prevLineHeight + mItemMargin;

            cl += getPaddingLeft();
            ct += getPaddingTop();

            child.layout(cl,
                    ct,
                    cl +  child.getMeasuredWidth(),
                    ct + child.getMeasuredHeight());

            currentLinePrevChildRight += child.getMeasuredWidth() + 2 * mItemMargin;
            prevChildHeight = child.getMeasuredHeight() + 2 * mItemMargin;
        }

    }

    ViewTreeObserver.OnGlobalLayoutListener mGlobalLayoutListener = new ViewTreeObserver.OnGlobalLayoutListener() {
        @Override
        public void onGlobalLayout() {
            getViewTreeObserver().removeOnGlobalLayoutListener(this);
            int w = ((View) getParent()).getMeasuredWidth();
            if (w != 0) {
                requestLayout();
            }
        }
    };
}
