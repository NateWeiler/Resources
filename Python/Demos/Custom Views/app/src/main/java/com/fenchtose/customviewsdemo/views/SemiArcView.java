package com.fenchtose.customviewsdemo.views;

import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;

/**
 * Created by elanicdroid on 06/10/15.
 */
public class SemiArcView extends ArcView {

    public SemiArcView(Context context) {
        super(context);
    }

    public SemiArcView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public SemiArcView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public SemiArcView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    @Override
    protected void onDraw(Canvas canvas) {

        int cx = canvas.getWidth()/2;
        int cy = canvas.getHeight() - 16;
        rect.set(cx - radius, cy - radius, cx + radius, cy + radius);
        canvas.drawArc(rect, startAngle, angle, false, p);
    }
}
