package com.fenchtose.customviewsdemo;

import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;

import com.plattysoft.leonids.ParticleSystem;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
//                snowfall();
            }
        }, 500);


//                .emit(findViewById(R.id.emiter_top_right), 8);

        /*new ParticleSystem(this, 80, R.mipmap.ic_launcher, 10000)
                .setSpeedModuleAndAngleRange(0f, 0.1f, 0, 0)
                .setRotationSpeed(144)
                .setAcceleration(0.000017f, 90)
                .emit(findViewById(R.id.emiter_top_left), 8);*/

        /*new ParticleSystem(this, 40, R.mipmap.ic_launcher, 10000)
                .setSpeedModuleAndAngleRange(0.1f, 0.3f, 80, 90)
                .setRotationSpeed(18)
//                .setAcceleration(0.00005f, 90)
//                .emit(findViewById(R.id.root), 8);
                .emitWithGravity(findViewById(R.id.root), 1, 10);*/
    }

    private void snowfall() {
        new ParticleSystem(this, 80, R.mipmap.snow_8, 10000)
                .setSpeedModuleAndAngleRange(0f, 0.1f, 70, 140)
                .setRotationSpeed(144)
                .setAcceleration(0.000017f, 90)
                .emit(findViewById(R.id.emiter_top_right), 2);

        new ParticleSystem(this, 80, R.mipmap.snow_8, 10000)
                .setSpeedModuleAndAngleRange(0f, 0.1f, 50, 110)
                .setRotationSpeed(144)
                .setAcceleration(0.000017f, 90)
                .emit(findViewById(R.id.emiter_top_left), 2);

        new ParticleSystem(this, 80, R.mipmap.snow_8, 10000)
                .setSpeedModuleAndAngleRange(0f, 0.1f, 50, 100)
                .setRotationSpeed(144)
                .setAcceleration(0.000017f, 90)
                .emitWithGravity(findViewById(R.id.emiter_center), Gravity.LEFT, 2);

        new ParticleSystem(this, 80, R.mipmap.snow_8, 10000)
                .setSpeedModuleAndAngleRange(0f, 0.1f, 70, 140)
                .setRotationSpeed(144)
                .setAcceleration(0.000017f, 90)
                .emitWithGravity(findViewById(R.id.emiter_center), Gravity.RIGHT, 2);
    }
}
