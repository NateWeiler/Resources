package com.fenchtose.customviewsdemo.views;

import android.animation.Animator;
import android.animation.ValueAnimator;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RectF;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

import com.fenchtose.customviewsdemo.R;

/**
 * Created by elanicdroid on 06/10/15.
 */
public class ArcView extends View {

    private static final String TAG = "MyArcView";
    Paint p;
    RectF rect;

    protected float startAngle;
    protected float angle;
    protected int radius;
    protected int mPaintColor;
    protected int thickness;

    public static final int DEFAULT_PAINT_COLOR = 0xff1976d2;
    public static final int DEFAULT_RADIUS = 100;
    public static final float DEFAULT_START_ANGLE = 180f;
    public static final float DEFAULT_SWEEP_ANGLE = 45f;
    public static final int DEFAULT_THICKNESS = 32;

    private ValueAnimator mAngleAnimator;

    public ArcView(Context context) {
        super(context);
        init(context, null);
    }

    public ArcView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public ArcView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public ArcView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        configureAttrs(attrs);

        p = new Paint();
        p.setColor(mPaintColor);
        p.setAntiAlias(true);
        p.setStyle(Paint.Style.STROKE);
        p.setStrokeWidth(thickness);
        p.setStrokeCap(Paint.Cap.ROUND);

        rect = new RectF(0, 0, 0, 0);
    }

    private void configureAttrs(AttributeSet attr) {
        if (attr != null) {
            TypedArray a = getContext().obtainStyledAttributes(attr, R.styleable.ArcView);
            mPaintColor = a.getColor(R.styleable.ArcView_arc_color, DEFAULT_PAINT_COLOR);
            startAngle = a.getFloat(R.styleable.ArcView_arc_start_angle, DEFAULT_START_ANGLE);
            angle = a.getFloat(R.styleable.ArcView_arc_sweep_angle, DEFAULT_SWEEP_ANGLE);
            radius = a.getDimensionPixelOffset(R.styleable.ArcView_arc_radius, DEFAULT_RADIUS);
            thickness = a.getDimensionPixelOffset(R.styleable.ArcView_arc_thickness, DEFAULT_THICKNESS);
            return;
        }

        mPaintColor = DEFAULT_PAINT_COLOR;
        startAngle = DEFAULT_START_ANGLE;
        angle = DEFAULT_SWEEP_ANGLE;
        radius = DEFAULT_RADIUS;
        thickness = DEFAULT_THICKNESS;
    }

    @Override
    protected void onDraw(Canvas canvas) {

        int cx = canvas.getWidth()/2;
        int cy = canvas.getHeight()/2;

        rect.set(cx - radius, cy - radius, cx + radius, cy + radius);

        canvas.drawArc(rect, startAngle, angle, false, p);
    }

    public void setAngle(float angle, boolean animate) {
        if (!animate) {
            Log.i(TAG, "set angle: " + angle);
            this.angle = angle;
            invalidate();
            return;
        }

        stopAnimation();
        startAnimation(this.angle, angle);
    }

    private void startAnimation(final float currentValue, float finalValue) {
        mAngleAnimator = ValueAnimator.ofFloat(currentValue, finalValue);
        mAngleAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                setAngle((float)animation.getAnimatedValue(), false);
            }
        });

        mAngleAnimator.setDuration(500);
        mAngleAnimator.start();

        mAngleAnimator.addListener(new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animation) {

            }

            @Override
            public void onAnimationEnd(Animator animation) {
                mAngleAnimator = null;
            }

            @Override
            public void onAnimationCancel(Animator animation) {
                mAngleAnimator = null;
            }

            @Override
            public void onAnimationRepeat(Animator animation) {

            }
        });
    }

    private void stopAnimation() {
        if (mAngleAnimator != null) {
            mAngleAnimator.cancel();
        }
    }

    public void setRadius(int rad) {
        radius = rad;
        invalidate();
    }

    public void setStartAngle(float angle) {
        startAngle = angle;
        invalidate();
    }

    public void setProgressColor(int color) {
        mPaintColor = color;
        invalidate();
    }
}
