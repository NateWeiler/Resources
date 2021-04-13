package com.fenchtose.customviewsdemo.views;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.v4.content.ContextCompat;
import android.util.AttributeSet;
import android.util.Log;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.fenchtose.customviewsdemo.R;

/**
 * Created by elanicdroid on 08/10/15.
 */
public class RatingView extends LinearLayout {

    private static final String TAG = "RatingView";
    private int mTotalNum;
    private int mRateNum;

    private Drawable mActiveDrawable;
    private Drawable mInactiveDrawable;

    private int margin;
    private int mItemSize;

    private static final int DEFAULT_INACTIVE_RES = R.drawable.ic_favorite_outline_theme_24dp;
    private static final int DEFAULT_ACTIVE_RES = R.drawable.ic_favorite_theme_24dp;
    private static final int DEFAULT_MARGIN = 8; //dp
    private static final int DEFAULT_TOTAL_NUM = 5;
    private static final int DEFAULT_RATE_NUM = 3;
    private static final int DEFAULT_SIZE = 24; //dp

    public RatingView(Context context) {
        super(context);
        init(context, null);
    }

    public RatingView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public RatingView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public RatingView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        setOrientation(HORIZONTAL);
        configureAttrs(attrs);
        for (int i=0; i<mTotalNum; i++) {
            addNewItem();
        }

        setRating(mRateNum);
    }

    private void configureAttrs(AttributeSet attr) {

        Context context = getContext();
        float density = context.getResources().getDisplayMetrics().density;

        if (attr != null) {
            TypedArray a = getContext().obtainStyledAttributes(attr, R.styleable.RatingView);

            Log.i(TAG, a.toString());
            Log.i(TAG, "size: " + a.length());

            mTotalNum = a.getInt(R.styleable.RatingView_rate_total, DEFAULT_TOTAL_NUM);
            mRateNum = a.getInt(R.styleable.RatingView_rate_active, DEFAULT_RATE_NUM);
            int activeResId = a.getResourceId(R.styleable.RatingView_rate_active_drawable, DEFAULT_ACTIVE_RES);
            int inactiveResId = a.getResourceId(R.styleable.RatingView_rate_inactive_drawable, DEFAULT_INACTIVE_RES);
            margin = a.getDimensionPixelOffset(R.styleable.RatingView_rate_margin,
                    (int)(DEFAULT_MARGIN * density));
            mItemSize = a.getDimensionPixelOffset(R.styleable.RatingView_rate_size,
                    (int)(DEFAULT_SIZE * density));

            mActiveDrawable = ContextCompat.getDrawable(context, activeResId);
            mInactiveDrawable = ContextCompat.getDrawable(context, inactiveResId);

            a.recycle();

            Log.i(TAG, "mRateNum: " + mRateNum);
            Log.i(TAG, "mTotalNum: " + mTotalNum);

            return;
        }

        mTotalNum = DEFAULT_TOTAL_NUM;
        mRateNum = DEFAULT_RATE_NUM;
        margin = (int)(DEFAULT_MARGIN * density);
        mItemSize = (int)(DEFAULT_SIZE * density);
        mActiveDrawable = ContextCompat.getDrawable(context, DEFAULT_ACTIVE_RES);
        mInactiveDrawable = ContextCompat.getDrawable(context, DEFAULT_INACTIVE_RES);
    }

    private void addNewItem() {
        LayoutParams params = new LayoutParams(mItemSize, mItemSize);
        params.leftMargin = margin;
        params.rightMargin = margin;

        ImageView imageView = new ImageView(getContext());
        imageView.setImageDrawable(mInactiveDrawable);
        addView(imageView, params);
    }

    public void setRating(int num) {
        int pos = 0;
        for (int i=0; i < getChildCount(); i++) {
            ImageView child = (ImageView)getChildAt(i);
            child.setImageDrawable(pos>=num ? mInactiveDrawable : mActiveDrawable);
            pos++;
        }
    }
}
