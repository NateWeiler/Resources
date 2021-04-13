package com.fenchtose.customviewsdemo.views;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.fenchtose.customviewsdemo.R;
import com.fenchtose.customviewsdemo.views.utils.CircleImageView;
import com.fenchtose.customviewsdemo.views.utils.SquareWidthImageView;

/**
 * Created by Jay Rambhia on 22/12/15.
 */
public class Collage3View extends ViewGroup {

    private static final String TAG = "Collage3View";

    private int bottomMargin = 8; // dp
    private int bottomLayoutTopMargin = 8; //dp
    private int leftMargin = 8; // dp
    private int rightMargin = 8; // dp

    public Collage3View(Context context) {
        super(context);
        init(context, null);
    }

    public Collage3View(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public Collage3View(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public Collage3View(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {

        float density = getResources().getDisplayMetrics().density;

        bottomMargin = (int)(bottomMargin * density);
        bottomLayoutTopMargin = (int)(bottomLayoutTopMargin * density);
        leftMargin = (int)(leftMargin * density);
        rightMargin = (int)(rightMargin * density);

        for (int i=0; i<3; i++) {
            ImageView child = newImage();
            addView(child, new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        }

        CircleImageView profileView = new CircleImageView(getContext());
        profileView.setImageResource(R.mipmap.ic_launcher);
        addView(profileView, new LayoutParams((int) (36 * density), (int) (36 * density)));

        TextView textView = new TextView(getContext());
        textView.setText("@username");
        textView.setTextColor(0xaa000000);
        addView(textView, new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT));

        ImageView actionButton = new ImageView(getContext());
        actionButton.setImageResource(R.mipmap.ic_launcher);
        addView(actionButton, new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT));
    }

    private ImageView newImage() {
        ImageView view = new SquareWidthImageView(getContext());
        view.setImageResource(R.mipmap.ic_launcher);
        return view;
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

        int width = MeasureSpec.getSize(widthMeasureSpec);

        int availableWidth = width - getPaddingLeft() - getPaddingRight();

        Log.i(TAG, "width: " + width);
        Log.i(TAG, "available width: " + availableWidth);
        Log.i(TAG, "bigger width: " + (int) (availableWidth * 0.66f));
        Log.i(TAG, "small width: " + (int)(availableWidth * 0.34f));

        int bigWidth = (int) (availableWidth * 0.666f);
        int smallWidth = ((int) (availableWidth * 0.333f));

        View bigImage = getChildAt(0);
        bigImage.measure(MeasureSpec.makeMeasureSpec(bigWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(bigWidth, MeasureSpec.EXACTLY));

        View smallImage1 = getChildAt(1);
        smallImage1.measure(MeasureSpec.makeMeasureSpec(smallWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(smallWidth, MeasureSpec.EXACTLY));

        View smallImage2 = getChildAt(2);
        smallImage2.measure(MeasureSpec.makeMeasureSpec(smallWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(smallWidth, MeasureSpec.EXACTLY));

        View profileView = getChildAt(3);
        measureChild(profileView, widthMeasureSpec, heightMeasureSpec);

        View textView = getChildAt(4);
        measureChild(textView, widthMeasureSpec, heightMeasureSpec);

        View actionButton = getChildAt(5);
        measureChild(actionButton, widthMeasureSpec, heightMeasureSpec);

        Log.i(TAG, "textview height: " + textView.getMeasuredHeight());

        int hMode = MeasureSpec.getMode(heightMeasureSpec);
        if (hMode == MeasureSpec.AT_MOST) {
            int height = bigWidth + getPaddingTop() + getPaddingBottom() + profileView.getMeasuredHeight()/3
                    + bottomLayoutTopMargin
                    + Math.max(textView.getMeasuredHeight(), actionButton.getMeasuredHeight());
            heightMeasureSpec = MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY);
            setMeasuredDimension(widthMeasureSpec, heightMeasureSpec);
        }
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {

        int cl = getPaddingLeft();
        int ct = getPaddingTop();

        View bigChild = getChildAt(0);
        int bigChildEndY = ct + bigChild.getMeasuredHeight();

        bigChild.layout(cl, ct, cl + bigChild.getMeasuredWidth(), bigChildEndY);

        View s1Child = getChildAt(1);
        s1Child.layout(cl + bigChild.getMeasuredWidth(), ct, cl + bigChild.getMeasuredWidth() + s1Child.getMeasuredWidth(),
                ct + s1Child.getMeasuredHeight());

        View s2Child = getChildAt(2);
        s2Child.layout(cl + bigChild.getMeasuredWidth(), ct + s1Child.getMeasuredHeight(),
                cl + bigChild.getMeasuredHeight()  + s2Child.getMeasuredWidth(),
                ct + s1Child.getMeasuredHeight() + s2Child.getMeasuredHeight());


        View profileView = getChildAt(3);
        int profileEndY = bigChildEndY + (int)(profileView.getMeasuredHeight() * 0.34);

        profileView.layout(cl + leftMargin,bigChildEndY - (int)(profileView.getMeasuredHeight() * 0.66),
                cl + leftMargin + profileView.getMeasuredWidth(),
                profileEndY);

        View actionButton = getChildAt(5);
        actionButton.layout(r - getPaddingRight() - rightMargin - actionButton.getMeasuredWidth(),
                profileEndY + bottomLayoutTopMargin,
                r - getPaddingRight() - rightMargin,
                profileEndY + bottomLayoutTopMargin +actionButton.getMeasuredHeight());

        View textview = getChildAt(4);
        textview.layout(cl + leftMargin, profileEndY + bottomLayoutTopMargin,
                cl + leftMargin + textview.getMeasuredWidth(),
                profileEndY + bottomLayoutTopMargin + textview.getMeasuredHeight());

        Log.i(TAG, "small child width: " + s2Child.getMeasuredWidth());
        Log.i(TAG, "profile width: " + profileView.getMeasuredWidth());
    }
}
