#ifndef _BORAD_H__
#define _BORAD_H__
#include"Buff.h"

#define SHAPE "---------------"
#define LONGSHAPE "--------------------"

class Board {
public:
	friend bool IsContact(Board&, Buff&);
	friend bool IsGameOver(void);
	friend bool BallWithinBoard(void);
	friend bool BallOut(void);
	friend bool BallOnBoard(void);

	void Initialize(void);
	void Show(void);
	void Move(char);
	void GetLonger(void);

private:
	bool is_long_;
	float speed_;
	int length_;
	int x_, y_;
};
#endif /* _BORAD_H__ ends */
