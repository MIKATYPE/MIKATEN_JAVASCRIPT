/* **************************************************************************** */
/* 美佳のタイプトレーナー テンキー編 JAVASCRIPT版ソースコード Ver2.05.01        */
/*                                     Copy right 今村二朗 2023/10/18           */
/*                                                                              */
/* このソースコードは 改変、転載、他ソフトの使用など自由にお使いください        */
/*                                                                              */
/* 注意事項                                                                     */
/*                                                                              */
/* グラフィック表示は640x400ドットの仮想画面に行い実座標に変換して表示してい    */
/* ます。                                                                       */
/*                                                                              */
/* JAVASCRIPTでは横軸がX座標、縦軸がY座標ですがこのソースコードでは横軸がY座標  */
/* 縦軸がX座標です。                                                            */
/*                                                                              */
/* **************************************************************************** */
MIKA_cookie=0; /* クッキー 読み込み変数 */
MIKA_code='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; /* クッキー書き込み用62進数文字列テーブル */
MIKA_cookie_array0=new Array(100); /* クッキー読み込み配列 */
MIKA_cookie_array1=new Object(); /* クッキー読み込み連想配列 */
MIKA_month_day=[31,28,31,30,31,30,31,31,30,31,30,31]; /* 月ごとの最大日付 */
MIKA_date_type=[1,2,2,2,3,4,4]; /* =1 月が一桁、日が一桁 =2 月が一桁、日が二桁 =3 月が二桁 日が一桁 =4 月が二桁、日が二桁 */
MIKA_date_type1=[0,0,0,0,0,0,0]; /* シャッフル用領域１ */
MIKA_date_type2=[0,0,0,0,0,0,0]; /* シャッフル用領域２ */
MIKA_space_code=' '; /* 数字の区切りのスペースコード */
MIKA_return_code='←'; /* 数字の区切りの←コード */
MIKA_Procptimer=0; /* ポジション練習ガイドキー文字位置表示用タイマー */
MIKA_Procrtimer=0; /* ランダム練習 入力速度表示用タイマー */
MIKA_sec_count=0; /* ランダム練習 秒カウンター */
MIKA_type_date=0; /* 最高速度達成日 一時保存エリア */
MIKA_rt_t=0; /* 成績表示用合計累積練習時間  秒 */
MIKA_r_date= /* ランダム練習 最高速度達成日付 */
	[
		"00/00/00",
		"00/00/00",
		"00/00/00"
	];
MIKA_r_speed=[ /* ランダム練習 最高速度記録 */
		0.0,0.0,0.0
	];
MIKA_p_time=0; /* ポジション練習 累積練習時間 秒*/
MIKA_r_time= /* ランダム練習 累積練習時間 秒 */
	[
		0,0,0
	];
MIKA_c_pos1="789"; /* キーボード 上一段 刻印文字列 */
MIKA_c_pos2="456"; /* キーボード ホームポジション 刻印文字列 */
MIKA_c_pos3="123"; /* キーボード 下一段 刻印文字列 */
MIKA_c_pos4="0 .←"; /* キーボード 最下段 刻印文字列 */
MIKA_c_post = [ MIKA_c_pos1,MIKA_c_pos2,MIKA_c_pos3,MIKA_c_pos4 ]; /* キーボード刻印文字列テーブル */
MIKA_h_pos1="0123456789←"; /* ポジション練習 練習文字列 */
MIKA_h_pos2="0123456789"; /* ランダム練習 練習文字列 */
MIKA_h_pos3=".0123456789"; /* ランダム練習(小数点有) 練習文字列 */
MIKA_h_pos4="/0123456789"; /* ランダム連取(日付) 練習文字列 */
MIKA_h_pos=[MIKA_h_pos1,MIKA_h_pos2,MIKA_h_pos3,MIKA_h_pos4]; /* ポジション練習 ランダム練習 練習文字列テーブル */
MIKA_p_count=null; /* 練習回数配列 アドレス */
MIKA_p_count_position=[0]; /* ポジション練習 練習回数 */
MIKA_p_count_random=[0,0,0]; /* ランダム練習 練習回数 */
MIKA_char_table=0;/* 練習文字列テーブル アドレス */
MIKA_magenta='RGB(128,32,128)'; /* 濃いめのマゼンタ */
MIKA_green='RGB(0,128,0)'; /* 濃いめのグリーン */
MIKA_blue='RGB(0,0,128)'; /* 濃いめの青 */
MIKA_cyan='RGB(0,128,128)'; /* 濃いめのシアン */
MIKA_orange='RGB(128,32,0)'; /* 濃いめのオレンジ */
MIKA_red='RGB(128,0,0)'; /* 濃いめの赤 */
MIKA_color_position_err='RGB(192,0,0)' /* ポジション練習のエラー文字の赤 */
MIKA_bk_color='RGB(255,255,255)'; /* 背景の色 */
MIKA_finger_color='RGB(255,191,63)'; /* 指の色 */
// MIKA_finger_color='RGB(255,0,0)';
MIKA_nail_color='RGB(255,255,191)'; /* 指の爪の色 */
MIKA_color_text_under_line='RGB(0,0,255)'; /* ランダム練習 の下線表示色 */
MIKA_key_black='RGB(0,0,0)'; /* 黒色 */
MIKA_key_gray='RGB(127,127,127)'; /* グレー */
MIKA_key_magenta='RGB(255,0,255)'; /* マゼンタ */
MIKA_key_blue='RGB(0,0,255)'; /* ブルー */
MIKA_key_red='RGB(255,0,0)'; /* 赤色 */
MIKA_type_kind_mes=0; /* 練習項目名 */
MIKA_type_speed_record=0; /* 最高速度記録配列アドレス */
MIKA_type_date_record=0; /* 最高速度達成日配列アドレス */
MIKA_type_time_record=0; /* 累積練習時間配列 アドレス */
MIKA_type_start_time = 0; /* ポジション練習 ランダム練習 練習開始時間 ミリ秒 */
MIKA_type_end_time = 0; /* ポジション練習 ランダム練習 練習終了時間 ミリ秒 */
MIKA_type_speed_time = 0.0; /* 前回 練習経過時間 秒 */
MIKA_ttype_speed_time = 0.0; /* 今回 練習経過時間 秒 */
MIKA_type_speed = 0.0; /* ランダム練習 の文字入力速度 */
MIKA_position_limit=60; /* ポジション練習 練習文字数 */
MIKA_random_key_limit=60.0; /* ランダム練習 キー入力の 制限時間 秒 */
MIKA_random_key_limit2=60.0; /* ランダム練習 タイマーの 制限時間 秒 */
MIKA_random_time_interval=1000; /* ランダム練習 一秒タイマー ミリ秒 */
MIKA_type_syuryou_flag=0; /* 練習終了時の記録更新フラグ =0 更新せず =1 前回の入力速度が0.0の時の記録更新 =2 前回の記録が0.0より大きい時の記録更新 */
MIKA_char_position=0; /* 練習文字番号 ポジション練習 ランダム練習にてランダムに文字を選択する時のポインター */
MIKA_key_char='A'; /* 練習文字 */
MIKA_guide_char='A'; /* ガイドキー文字 */
MIKA_err_char=0; /* エラー文字 */
MIKA_type_count=0; /* 入力文字数カウンター */
MIKA_type_err_count=0; /* エラー入力文字数カウンター */
MIKA_c_p1=0; /* ランダム練習 の練習文字ポインター 横位置 */
MIKA_c_p2=0; /* ランダム練習 の練習文字ポインター 縦位置 */
MIKA_err_char_flag=0; /* エラー入力フラグ */
MIKA_time_start_flag=0; /* 時間計測開始フラグ =0 開始前 =1 測定中 */
MIKA_random_scale=1.0; /* ランダム練習 の文字表示倍率 */
MIKA_max_x_flag = 0;/* 画面表示 縦行数モード =0 25行 =1 20行 */
MIKA_max_y_flag = 0;/* 画面表示 横文半角カラム数モード =0 80カラム =1 64カラム */
MIKA_width_x=16; /* 全角文字 半角文字 縦方向ドット数 */
MIKA_width_y=8; /* 半角文字 横方向ドット数 */
MIKA_practice_end_flag=0; /* 練習実行中フラグ =0 練習中 =1 終了中 ESCによる終了も含む */
MIKA_key_guide_flag=0; /* キーガイドメッセージ表示フラグ =0 表示なし =1 次回はキーガイドを表示を消して練習 =2次回はキーガイドを表示して練習 */
MIKA_menu_kind_flag=0; /* =1 キーガイド表示あり =3 キーガイド表示無し */
MIKA_key_guide_on=1; /* 定数 キーガイド表示あり */
MIKA_key_guide_off=3; /* 定数 キーガイド表示無し */
MIKA_type_end_flag = 0; /* 練習終了フラグ =0 ESCによる終了 =1 60文字入力による終了 */
MIKA_mes0="●●●  美佳のタイプトレーナー  テンキー編 Ver2.05.01  ●●●";
MIKA_mesta="●●●  美佳タイプ テンキー編 %s ●●●";
MIKA_mesi1="もう一度練習するときはTABキーを押してください";
MIKA_mesi2="メニューに戻るときはESCキーを押してください";
MIKA_mesi3="おめでとう、記録を更新しました";
MIKA_abort_mes="ESCキーを押すと中断します";
MIKA_return_mes="ESCキーを押すとメニューに戻ります";
MIKA_key_type_mes="のキーを打ちましょうね．．";
MIKA_kugiri_mes="数字の区切りではリターンキーまたは、Enterキーを押してください";
MIKA_keymes1="ｽﾍﾟｰｽを押すとｷｰｶﾞｲﾄﾞを消去します";
MIKA_keymes2="ｽﾍﾟｰｽを押すとｷｰｶﾞｲﾄﾞを表示します";
MIKA_keymes3="この次は、スペースキーを押してキーガイドの表示を消して練習してみましょうね";
MIKA_keymes4="この次は、スペースキーを押してキーガイドを表示して練習してみましょうね";
MIKA_mest2="練習項目           タイプ速度　文字／分       達成日       累積練習時間";
MIKA_mest2a="練習項目";
MIKA_mest2b="タイプ速度　文字／分";
MIKA_mest2c="達成日";
MIKA_mest2d="累積練習時間";
MIKA_menu_mes_s=[ /* 初期メニュー メニュー項目 */
		"ポジション練習",
		"ランダム練習",
		"ランダム練習(小数点有)",
		"ランダム練習(日付)",
		"成績表示",
		"成績消去"
	];
MIKA_menu_cord_s=[ /* 初期 メニュー項目表示位置 x座標 y座標 */
		[3*16,20*8],
		[5*16,20*8],
		[7*16,20*8],
		[9*16,20*8],
		[11*16,20*8],
		[14*16,20*8]
	];
MIKA_menu_s_sel_flag=[ /* 初期メニュー メニュー項目選択フラグ */
		0,0,0,0,0,0];
MIKA_menu_s_function=[ /* 初期メニュー 機能番号 */
		901,1001,1002,1003,29,30];
MIKA_fngpoint=[ /* 指表示位置 x 座標 y 座標 表示幅 */
[22*16,19*8,6*8], /* 右手親指 */
[20*16+2,27*8-4,5*8], /* 右手人指し指 */
[20*16-3,33*8-4,5*8], /* 右手中指 */
[20*16+2,39*8-4,5*8], /* 右手薬指 */
[21*16+8,45*8-4,4*8+2] /* 右手小指 */
];
MIKA_t_line =7; /* ランダム練習 練習テキスト表示開始行位置 */
MIKA_chat_t=[new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40)]; /* 練習テキスト文字 横40文字 縦10行 */
MIKA_cline_x=3; /* ランダム練習 練習テキスト行数 最小=3 最大 =10 */
MIKA_cline_c=0; /* ランダム練習 練習テキスト 文字数 */
MIKA_kazu_yoko=36; /* ランダム練習 一行最大文字数 */
MIKA_utikiri_flag=0;	/* ランダム練習 練習テキスト打ち切りフラグ =1 全練習テキスト打ち切りによる終了 =0 60秒タイマーによる終了 */
MIKA_utikiri_flag2=0;	/* 前回速度表示時の打ち切りフラグの値 */
MIKA_exec_func_no=1; /* メニューの機能番号 */
MIKA_type_kind_no=0; /* 練習項目番号 */
MIKA_menu_function_table=0; /* メニューの機能番号テーブルアドレス */
MIKA_sel_flag=0; /* 前回選択メニュー項目選択フラグアドレス */
MIKA_cookie_kind=0; /* クッキー種別 ='P' ポジション練習 ='R' ランダム練習 */
MIKA_mes_del_flag=0; /* 文字表示消去フラグ =1 色指定を背景色にしたとき =0 色指定を背景色以外にしたとき */
MIKA_win_size_width=960; /* ウィンドーサイズ横 */
MIKA_win_size_height=600; /* ウィンドーサイズ縦 */
addEventListener( "keydown", keydownfunction ); /* キーダウン処理追加 */
window.onload = function() {
 const MIKATEN = document.getElementById("MIKATEN"); /* MIKATEN キャンバス取得 */
    if (MIKATEN.getContext) { /* MIKATEN キャンバスが存在した場合 */
      const g = MIKATEN.getContext("2d");/* 2次元描画 */
		MIKA_win_size_width=MIKATEN.width; /* 表示ウィンドー横サイズ取得 */
		MIKA_win_size_height=MIKATEN.height; /* 表示ウィンド縦サイズ取得 */
		readcookie(); /* クッキー読み込み */
		convcookie(); /* クッキーを練習成績に変換 */
		MIKA_rt_t=seisekiruiseki(); /* 累積練習時間の合計を取得 */
		dispmen(g); /* 初期メニュー表示 */
		}
}
function keydownfunction(event) /* キーダウン処理 */
{
	const MIKATEN = document.getElementById("MIKATEN"); /* MIKATEN キャンバス取得 */
 	if (MIKATEN.getContext) { /* MIKATENのキャンバスが存在した場合 */
    	const g = MIKATEN.getContext("2d"); /* 2次元描画 */
		nChar=event.key; /* キーを取得 */
		if(nChar=='Enter') nChar='←'; /* Enterキーが押されたときは文字記号を 0x0d に設定 */
		else if(nChar=='Escape') nChar=0x1b; /* Ecsapeキーが押されたときは文字記号を 0x1b に設定 */
		else if(nChar=='Tab')
		{
			event.preventDefault(); /* ショートカットキーを無効化 */
		 	nChar=0x0d; /* Tabキーが押されたときは文字記号を 0x0d に設定 */
		}
		else if((nChar=='/')||(nChar=="'")) /* Firefoxにてショートカットキー / ' を無効にする */
		{
			if(event.cancelable) event.preventDefault(); /* ショートカットキーを無効化 */
		}
		if(nChar==0x0d||nChar==0x1b||nChar.length==1) /* 入力された文字がEnter かEscape か一文字の時に処理を実行 */
		{
			exec_func(g,nChar);	/* 入力文字に対応した処理を実行 */
		}
	}
}
function tconv(time) /* 練習時間秒を文字列に変換 */
	{
		var a;
		a=t0conv(time,0); /* 練習時間秒を "%5d時間%2d分%2d秒"のフォーマットで文字列に変換 */
		return a;
	}
function t0conv(time,flag) /* 練習時間秒をフォーマットを指定して文字列に変換 */
	{
		var a;
		var t1,t2,t3;
		t3=time%60; /* 秒を計算 */
		t3=formatd(t3,2);
		time=Math.floor(time/60);
		t2=time%60; /* 分を計算 */
		t2=formatd(t2,2);
		t1=Math.floor(time/60); /* 時間を計算 */
		t1=formatd(t1,5);
		a=t1+"時間"+t2+"分"+t3+"秒";
		return a;
	}
function cfind(a,line) /* 文字列から指定の文字の位置を検索する */
{
	var ii,jj;
	jj = line.length; /* 文字列長取得 */
	for (ii = 0;ii < 1000 && ii < jj;ii++)
	{
		if (a == line[ii]) /* 文字列から指定の文字と一致する文字が見つかった場合 */
		{
			return(ii + 1);
		}
	}
	return(0); /* 一致する文字が見つからない場合 */
}
function keyposit_x(x,y)/* ポジション練習でキーの位置に対応したキートップの表示x位置を仮想座標で求める */
{
	var x_pos;
	x_pos=4*MIKA_width_x+(x-1)*4*MIKA_width_x; /* キートップ左上 x 座標算出 */
	return x_pos;
}
function keyposit_y(x,y)/* ポジション練習でキーの位置に対応したキートップの表示y位置を仮想座標で求める */
{
	var y_pos;
	y_pos=26*MIKA_width_y+(y-1)*7*MIKA_width_y; /* キートップ左上 y 座標算出 */
	return y_pos;
}
function stringlength(a) /* 文字列長を半角文字=1 全角文字 =2 で計算する */
	{
		var i,ii,length;
		length=a.length; /* 文字列長取得 */
		ii=0;
		for(i=0;i<length;i++)
		{
			ii=ii+charlength(a.charAt(i)); /* i番目の文字長を加算 */
		}
		return ii;
	}	
function charlength(a) /* 文字が半角文字か全角文字かの判定を行う リターン値 半角=1 全角 =2 */
	{
		var i;
		var aa;
//		System.out.printf("a=%1c code=%d\n",a,(int)a);
		aa=a.charCodeAt(0);
		if(aa<255) i=1; /* 半角英数の場合 */
		else if(0xff61<=aa&&aa<=0xff9f) i=1; /* 半角カナ文字の場合 */
		else i=2; /* 半角英数 半角カナ文字以外の場合 */
		return i;
	}
function cslclr(g) /* 画面クリア */
{
	g.fillStyle=MIKA_bk_color; /* 表示色に背景色を設定 */
	g.fillRect(0,0,MIKA_win_size_width,MIKA_win_size_height); /* 背景色で画面クリア */
}
function cslcolor(g,color) /* 表示色を設定 */
{
	if(color==MIKA_bk_color) MIKA_mes_del_flag=1; /* 表示色が背景色の時は文字表示消去フラグを=1に設定 */
	else MIKA_mes_del_flag=0; /* 表示色が背景色以外の時は文字表示消去フラグを=0に設定 */
	g.fillStyle=color; /* 塗りつぶし色指定 */
	g.strokeStyle=color; /* 線描画色指定 */
}
function cslputscale(g,x1,y1,mes,scale) /* 仮想座標から実座標に変換して文字列を指定の倍率で表示 */
{
 	var font_size,font_width,font_height;
	var xx1,yy1;
	var xx,yy;
	var ffont_size;
	var measrure;
	var textwidth;
	var text_color;
	var h1,h2;
	font_size=cslfontsize(scale); /* 文字フォントサイズ取得 */
	ffont_size=font_size/1.33; /* フォントサイズ補正 */
	font_height=cslfonthight(1.0); /* 文字表示エリア高さ取得 */
	font_width=cslfontwidth(1.0); /* 文字表示エリア幅取得 */
	xx1=xcord(x1+MIKA_width_x); /* 表示位置x座標を仮想座標から実座標に変換 */
	yy1=ycord(y1); /* 表示位置 y座標を仮想座標から実座標に変換 */
	g.font=font_size.toFixed()+'px monospace'; /* 文字フォント指定 */
	xx=Math.floor(xx1+ (ffont_size-font_height)/2); /* 表示位置の中央の実x座標を計算 */
	yy=Math.floor(yy1+ (font_width - font_size)/2); /* 表示位置の中央の実y座標を計算 */
	if(MIKA_mes_del_flag==1) /* 表示消去の場合は文字表示エリアを背景色で塗りつぶし */
	{
		measure=g.measureText(mes); /* 文字表示エリア取得 */
		textwidth=measure.width; /* 文字表示エリア横幅を取得 */
		h1=measure.actualBoundingBoxAscent; /* 基準線より上のドット数取得 */
		h2=measure.actualBoundingBoxDescent; /*基準線より下のドット数取得 */
		g.fillRect(yy,xx-h1-1,textwidth,h1+h2+2); /* 背景色で文字表示エリアを塗りつぶし */
	}
	else
	{
		g.fillText(mes,yy,xx); /* 文字表示 */
	}
}		
function cslputzscale(g,x,y,a,scale) /* 半角英数を全角文字に変換して指定の倍率で表示 */
{
		var aa;
		if('0'<=a&&a<='9') { /* 数字を半角から全角に変換 */
			aa=String.fromCharCode(a.charCodeAt(0)+0xfee0);
		}
		else if('A'<=a&&a<='Z')
		{ /* 英大文字を半角から全角に変換 */
			aa=String.fromCharCode(a.charCodeAt(0)+0xfee0);
		}
		else if('a'<=a&&a<='z') { /* 英小文字を半角から全角に変換 */
			aa=String.fromCharCode(a.charCodeAt(0)+0xfee0);
		}
		else if(a==',') /* カンマを半角から全角に変換 */
		{
			aa='，';
		}
		else if(a=='.') /* ピリオドを半角から全角に変換 */
		{
			aa='．';
		}
		else if(a==' ') /* スペースを半角から全角に変換 */
		{
			aa='　';
		}
		else if(a==';') /* セミコロンを半角から全角に変換 */
		{
			aa='；';
		}
		else if(a=='/') /* スラッシュを半角から全角に変換 */
		{
			aa='／';
		}
		else {
			aa=a;
		}
		cslputscale(g,x,y,aa,scale); /* 文字列を指定で倍率で仮想座標で表示 */
}
function cslput(g,x,y,mes)/* 文字列を仮想座標で表示 */
{
	var i,j,length;
	length=mes.length; /* 文字列の長さを取得 */
	j=0;
	for(i=0;i<length;i++) 
	{
		cslputscale(g,x,y+j,mes[i],1.0); /* 指定位置に一文字表示 */
		j=j+8*charlength(mes[i]); /* 表示文字位置更新 半角文字は y座標を 1 加算 全角文字は 2加算 */
	}
}
function cslputu(g,x,y,mes,yy,color1) /* 文字列の下に下線を表示 */
// x 文字列表示左上仮想x座標
// y 文字列表示左上仮想y座標 
// mes アンダーラインを引く文字列
// yy 文字列下端から下線までのドット数間隔の補正値
// color1 表示色 
	{
		var char_length;
		var x1,x2,xx,y1,y2;
		var font_size,ffont_size;
		var font_hight;
		char_length=stringlength(mes); /* 文字列長取得 半角文字は長さ=1 全角文字は長さ=2で計算*/
		font_size=cslfontsize(1.0); /* 等倍のフォントサイズ取得 */
		ffont_size=font_size; /* フォントサイズ補正 */
		font_hight=cslfonthight(1.0); /* 表示エリア高さを取得 */
		x1=xcord(x+MIKA_width_x)+yy+(ffont_size-font_hight)/2+2; /* アンダーラインのx座標設定 */
		x2=xcord(1)-xcord(0); /* アンダーラインの太さを設定 */
		if(x2>0) x2--; /* 太さが一以上の時は太さを一減らす */
		y1=ycord(y); /* アンダーラインの開始y座標設定 */
		y2=ycord(y+char_length*8); /* アンダーラインの終了y座標設定 */
		cslcolor(g,color1); /* アンダーラインの色を設定 */
		if(color1==MIKA_bk_color) g.lineWidth=3; /* 線を消去の時は太さ3で描画 */
		else
		{
			g.lineWidth=2; /* 線を表示の場合は太さ2で描画 */
		}
		g.beginPath(); /* 直線描画開始 */
		for(xx=x1;xx<=x1+x2;xx++) /* 指定の太さのアンダーラインを描画 */
		{
			g.moveTo(y1,xx); /* 描画開始位置にペン移動 */
			g.lineTo(y2,xx); /* 描画終了位置まで直線を描画 */
		}
		g.stroke(); /* 直線描画実行 */
	}
function cslmencenter(g,x,mes) /* 中央にメッセージ文字列を表示 */
// x 文字列表示仮想座標
	{
		var y;
		var k;
		var kk;
		if(MIKA_max_y_flag==0) kk=80; /* 横幅半角80文字モード */
		else kk=64; /* 横幅半角64文字モード */
		k=stringlength(mes); /* 文字列長取得  半角文字は長さ=1 全角文字は長さ=2で計算*/
		y=((kk-k)*MIKA_width_y)/2; /* 表示開始位置計算 */
		cslput(g,x,y,mes); /* 文字列表示 */
}
function cslrectb(g,x1,y1,x2,y2,color1,color2,b) /* ポジション練習のキーを一個表示 */
{
	cslrectt(g,x1,y1,x2,y2,color1); /* キーの外枠を表示 */
	cslrecttt(g,x1,y1,x2,y2,color2,b); /* キーの内側を塗りつぶし */
}
function cslrectt(g,x1,y1,x2,y2,color1) /* 四角を表示 */
{
	cslrecttt(g,x1,y1,x2,y2,color1,0); /* 境界なしで四角を表示 */
}
function cslrecttt(g,x1,y1,x2,y2,color,b) /* 四角の内側を境界幅bで塗りつぶす */
{
	var xx1,xx2,yy1,yy2;
	var bx,by,bb;
	if(b!=0) /* 境界幅が0で無い場合 */
	{
		bx=xcord(b)-xcord(0); /* 縦方向の境界幅を仮想座標から実座標に変換 */
		by=ycord(b)-ycord(0); /* 横方向の境界幅を仮想座標から実座標に変換 */
		bb=Math.min(bx,by); /* 縦方向の境界幅と横方向の境界幅の小さい方の値を設定 */
		if(bb<=0) bb=1; /* 境界幅がゼロ以下の場合は境界幅を位置に設定 */
	}
	else bb=0;
	xx1=xcord(x1)+bb;	/* 左上 x 座標を 仮想座標から実座標に変換 */
	xx2=xcord(x2)-bb;	/* 右下 x 座標を 仮想座標から実座標に変換 */
	yy1=ycord(y1)+bb;	/* 左上 y 座標を 仮想座標から実座標に変換 */
	yy2=ycord(y2)-bb;	 /* 右下 y 座標を 仮想座標から実座標に変換 */
	g.fillStyle=color;  /* 表示色を設定 */
	if(xx1<=xx2&&yy1<=yy2)	g.fillRect(yy1,xx1,yy2-yy1,xx2-xx1);	/*四角を描画 */
}
function cslellipse(g,x1,y1,x2,y2,color) /* 指の丸みを楕円で表示 */
{
	var xx1,xx2,yy1,yy2,x,y,rx,ry;
	g.fillStyle=color; /* 塗りつぶし色指定 */
	xx1=xcord(x1); /* 左上 x 座標を 仮想座標から実座標に変換 */
	xx2=xcord(x2); /* 右下 x 座標を 仮想座標から実座標に変換 */
	yy1=ycord(y1); /* 左上 y 座標を 仮想座標から実座標に変換 */
	yy2=ycord(y2); /* 右下 y 座標を 仮想座標から実座標に変換 */
	x=(xx1+xx2)/2; /* 楕円の中心x座標を算出 */
	y=(yy1+yy2)/2; /* 楕円の中心のy座標を算出 */
	rx=x-xx1-1; /* 楕円のx方向の半径算出 */
	ry=y-yy1-1; /* 楕円のy方向の半径算出 */
	g.beginPath(); /* 描画開始 */
	g.ellipse(y,x,ry,rx,0,0,Math.PI*2); /* 楕円描画 */
	g.fill(); /* 楕円内を塗りつぶし */
	}	
function cslkeyback(g,x_pos,y_pos,color) /* ポジション練習にてエラー文字とキーガイド文字の背景を塗りつぶす */
{
	var dx,dy;
	dx=7;
	dy=7;
	cslrectt(g,x_pos+MIKA_width_x-dx,y_pos+MIKA_width_y-dy,x_pos+2*MIKA_width_x+dx,y_pos+3*MIKA_width_y+dy,color);
}
function cslfonthight(scale) /* 指定倍率で全角文字の表示エリア高さを取得 */
{
	var font_hight;
	var font_size;
	font_size=MIKA_width_x*scale; /* 表示エリア高さを仮想座標で計算 */
	font_hight=xcord(font_size)-xcord(0);  /* 表示エリア高さを実座標に変換 */
	return font_hight;
}
function cslfontwidth(scale) /* 指定倍率で全角文字の表示エリア幅を取得 */
{
	var font_width;
	var font_size;
	font_size=(MIKA_width_y*2*scale); /* 表示エリア幅を仮想座標で計算 */
	font_width=ycord(font_size)-ycord(0); /* 表示エリア幅を実座標に変換 */
	return font_width;
}
function cslfontsize(scale) /* 指定倍率でフォントサイズを取得 */
	{
		var font_hight;
		var font_width;
		var font_size;
		font_hight=cslfonthight(scale); /* 指定倍率で表示エリア高さを取得 */
		font_width=cslfontwidth(scale); /* 指定倍率で表示エリア幅を取得 */
		font_size=Math.min(font_hight,font_width); /* 表示エリア高さと表示エリア幅の小さい方の値をフォントサイズに指定 */
		return font_size;
	}
function xcord(x1) /* 仮想x座標を 実x座標に変換 */
{
	var max_x_cord1;
	var x,xx;
	if(MIKA_max_x_flag==0) /* 縦25行モードの設定 */
	{
		max_x_cord1=25*16;
	}
	else /* 縦20行モードの設定 */
	{
		max_x_cord1=20*16;
	}
	x=MIKA_win_size_height;
	xx=Math.floor((x*x1)/max_x_cord1); /* 仮想座標を実座標に変換 */
	return(xx);
}
function ycord(y1) /* 仮想y座標を 実y座標に変換 */
{
    var max_y_cord1;
    var y, yy;
 	if(MIKA_max_y_flag==0) /* 一行横 80カラムモードの設定 */
	{
		max_y_cord1=80*8;
	}
	else /* 一行横 64カラムモードの設定 */
	{
		max_y_cord1=64*8;
	}
    y = MIKA_win_size_width;
    yy = Math.floor((y * y1) / max_y_cord1); /* 仮想座標を実座標に変換 */
    return(yy);
}
function  xxcord(x) /* ランダム練習 で 練習文字の表示x仮想座標を計算 */
	{
		var xx;
		xx=	MIKA_t_line*16+x*20; /* MIKA_t_lineを開始行にして、ドット高さ20ドットで表示 */
		return xx;
	}
function yycord(y) /* ランダム練習 で 練習文字の表示y仮想座標を計算 */
	{
		var yy;
		yy=y*16; /*  横 16ドット間隔で表示 */
		return yy;
	}
function homeposi(x,y) /* キーの位置がホームポジションかの判定 */
	{ 
		if(x==2) return(1); /* ホームポジションの場合は 1 でリターン */
		else return(0); /* ホームポジション以外は 0でリターン */
	}
function poofinger(g,x_finger,y_finger,width_finger,color) /* 指の爪を表示 */
	{
		var x1,x2,y1,y2;
		x1=x_finger+4; /* 爪のイラストの左上の x座標取得 */
		y1=y_finger+4; /* 爪のイラストの左上の y座標取得 */
		x2=x_finger+24; /* 爪のイラストの左下の x座標取得 */
		y2=y_finger+width_finger-4; /* 爪のイラストの右上の y座標取得 */
		cslellipse(g,x1-7,y1,x1+7,y2,color); /* 爪の丸みを楕円で表示 */
		cslrectt(g,x1,y1,x2,y2,color); /* 爪の本体の四角を表示 */
	}
function pofinger(g,x_pos,y_pos,yubi_haba,flag)	/* 指を一本表示 */
//	flag=0 指のイラストを描画 
//	flag=1 指のイラストを消去
{
	var x1,x2,y1,y2;
	var color
	x1=x_pos; /* 指の左上のx座標取得 */
	x2=400;  /* 指の下端のx座標取得 */
	y1=y_pos;/* 指の左上の y座標取得 */
	y2=y_pos+yubi_haba; /* 指の右上の y座標取得 */
	if (flag==0)
	{
		 color=MIKA_finger_color; /* 指のイラストを表示する色指定 */
	}
	else
	{
		 color=MIKA_bk_color; /* 指のイラストを消去する色指定 */
		x1=x1-1; /* 消去の場合は一ドット上に描画 */
	}
	cslellipse(g,x1-8,y1,x1+8,y2,color); /* 指の丸みを楕円で表示 */
	cslrectt(g,x1,y1,x2,y2,color); /* 指の本体を四角で表示 */
	if (flag==0) /* 指のイラストを表示する時には爪のイラストも表示 */
	{
		poofinger(g,x_pos,y_pos,yubi_haba,MIKA_nail_color); /* 爪のイラスト表示 */
	}
}
function pfinger(g,flag) /* 指のイラスト 5本表示  flag=0 表示 flag=1 消去 */
//	flag=0 指のイラストを描画 
//	flag=1 指のイラストを消去
{
	var i;
	for(i=0;i<5;i++) /* 指を5本描く */
	{
		pofinger(g,MIKA_fngpoint[i][0],MIKA_fngpoint[i][1],MIKA_fngpoint[i][2],flag); /* 指を一本づつ表示 */
	}
}
function difposit(g,a,flag) /* 文字に対応したキーを打つ指の爪を表示 */
// flag=0 爪を黒で表示
// flag=1 爪を元の色に戻して表示
	{
		var pos1;
		var x,y;
		var	yy;
		var x_finger,y_finger,yubi_haba;
		var color1;
		var color2;
		if(a===0) return;
		pos1=keycord(a); /* 文字に対応したキーの位置を取得 */
		x=pos1[0]; /* キーの行位置番号を取得 */
		y=pos1[1]; /* キーの列位置番号を取得 */
		if(x==0||y==0) return; /* 対応するキーが無い場合は無処理でリターン */
		if(a=='←') yy=5; /* エンターキーは小指を指定 */
		else if(a=='0') yy=1; /* 数字 0 は親指を指定 */
		else yy=y+1; /* その他の数字は人指し指 中指 薬指を指定 */		
		x_finger=MIKA_fngpoint[yy-1][0]; /* 指番号に対応した指の左上 x座標取得 */ 
		y_finger=MIKA_fngpoint[yy-1][1]; /* 指番号に対応した指の左上 y座標取得 */
		yubi_haba=MIKA_fngpoint[yy-1][2]; /* 指番号に対応した指の指幅取得 */
//		System.out.printf("finger x=%d y=%d x_finger=%d y_finger=%d yubi_haba=%d\n",x,y,x_finger,y_finger,yubi_haba);
		if(flag==0) /* フラグが=0の時は指の爪を黒で表示 */
		{
			color1=MIKA_key_black;
		}
		else /* フラグが=1の時は指の爪を元の色に戻して表示 */
		{
			color1=MIKA_nail_color;
			poofinger(g,x_finger-1,y_finger,yubi_haba,MIKA_finger_color); /* x座標を-1して指の爪を指色で表示 */			
		}
		poofinger(g,x_finger,y_finger,yubi_haba,color1); /* 指の爪を表示 */
	}
function dispguidechar(g,key_char,flag) /* ポジション練習で練習文字を表示 */
// flag=0 練習文字を黒色で表示
// flag=1 練習文字を消去
{
		var	color;
		var x,y;
		var scale=2.8;
		if(key_char!==0) /* 練習文字がゼロでない場合 */
		{
				x=2*MIKA_width_x-2; /* 表示位置 x座標算出 */
				y=34*MIKA_width_y-1; /* 表示位置 y座標算出 */
				if(flag==0)
				{
					color=MIKA_key_blue; /* フラグが=0の時は青色で表示 */
				}
				else
				{
					color=MIKA_bk_color; /* フラグが=1の時は表示を消去 */
				}
				cslcolor(g,color); /* 表示色を設定 */
				cslputzscale(g,x,y,key_char,scale); /* 指定位置に 2.8倍の大きさで練習文字を表示 */
		}
}
function dipline(g,x,line,flag) /* キーボード一列表示*/
// x 表示行位置番号 
// line キートップ文字列 
// flag=0 キートップとキーの刻印文字を表示 
// flag=1 キートップのみ表示してキーの刻印は表示しない
// flag=2 キーの刻印のみを表示
// flag=3 キーの刻印を消去
{
		var x_pos,y_pos;
		var i,ii;
		var x1,y1,x2,y2,x3,y3;
		var color1,color2,color3;
		var a;
		ii=line.length; /* キートップ文字列長取得 */
		for(i=0;i<ii;i++)
		{	
			x_pos=keyposit_x(x+1,i+1); /* キーの表示位置の仮想x座標を取得 */
			y_pos=keyposit_y(x+1,i+1); /* キーの表示位置の仮想y座標を取得 */
			x1=x_pos; /* 表示開始 x 座標取得 */
			y1=y_pos-4; /* 表示開始 y座標取得 */
			x2=x_pos+3*MIKA_width_x; /* 表示終了 x 座標取得 */
			y2=y_pos+4*MIKA_width_y+4; /* 表示終了 y 座標取得 */
			x3=x_pos+MIKA_width_x; /* 表示 文字位置 x 座標取得 */
			y3=y_pos+MIKA_width_y; /* 表示 文字位置 y 座標取得 */
			if(homeposi(x+1,i+1)==1) /* ホームポジションはマゼンタで表示 */
			{
				color1=MIKA_key_black; /* ホームポジションはマゼンタで表示 */
				color2=MIKA_key_magenta; /* キー外枠は黒色 */
				color3=MIKA_key_black; /* 文字は黒色 */
			}
			else
			{
				color1=MIKA_key_black; /* キー外枠は黒色 */
				color2=MIKA_key_gray; /* キー内側はグレー */
				color3=MIKA_key_black; /* 文字は黒色 */
			}
			if(flag==0||flag==1) /* キーの背景を表示 */
			{
				cslrectb(g,x1,y1,x2,y2,color1,color2,1); /* 外枠付きでキーを表示 */
			}
			if(flag==0||flag==2) /* キーの刻印文字を表示 */
			{
				cslcolor(g,color3); /* キー刻印の表示色を指定 */
				cslputzscale(g,x3,y3,line.charAt(i),1.8); /* キーの刻印を 1.8倍で表示 */
			}
			else if(flag==3) cslkeyback(g,x_pos,y_pos,color2); /* キーの刻印を消去 */
		}
}
function dikposit(g,a,flag) /* ポジション練習でエラー文字とガイドキー文字の表示及び復帰を行う */
//	a ガイドキーの文字
//	flag=0 ガイドキー文字を黒い背景で表示
//	flag=1 ガイドキー文字の表示をキーの刻印ありで復帰
//	flag=2 ガイドキー文字の表示をキーの刻印なしで復帰
//	flag=3 エラーキー文字の表示は赤い背景で表示
{
	var pos1,x,y,x_posit,y_posit;
	var BkColor,TextColor;
	if(a===0) return;
	pos1=keycord(a); /* 文字からキーの位置を算出 */
	x=pos1[0]; /* キー位置の行番号を取得 */
	y=pos1[1]; /* キー位置の列番号を取得 */
	if(x==0||y==0) return;
	x_posit=keyposit_x(x,y); /* キー位置に対応した仮想x座標を取得 */
	y_posit=keyposit_y(x,y); /* キー位置に対応した仮想y座標を取得 */
//	if(x_posit==0||y_posit==0) return;
	if(flag==0) /* ガイドキー文字表示の場合 */
	{
		if (homeposi(x,y)==1) /* ガイドキー文字がホームポジョションの場合 */
		{
			BkColor=MIKA_key_black; /* 背景は黒で表示 */
			TextColor=MIKA_key_magenta; /* 文字はマゼンタで表示 */
		}
		else /* ホームポジションではない場合 */
		{
			BkColor=MIKA_key_black; /* 背景は黒で表示 */
			TextColor=MIKA_key_gray; /* 文字はグレーで表示 */
		}
	}
	else if(flag==1||flag==2) /* 表示復帰の場合 */
	{
		if (homeposi(x,y)==1) /* ガイドキー文字がホームポジションの場合 */
		{
			BkColor=MIKA_key_magenta; /* 背景はマゼンタで表示 */
			TextColor=MIKA_key_black; /* 文字は黒で表示 */
		}
		else
		{
			BkColor=MIKA_key_gray; /* 背景はグレーで表示 */
			TextColor=MIKA_key_black; /* 文字は黒で表示 */
		}
	}
	else /* flag==3 エラーキー表示の場合 */
	{
		BkColor=MIKA_color_position_err; /* 背景は赤で表示 */
		TextColor=MIKA_key_black; /* 文字は黒で表示 */
	}
	cslkeyback(g,x_posit,y_posit,BkColor); /* 背景を表示 */
	cslcolor(g,TextColor); /* 表示色を文字色に設定 */
	if(flag==0||flag==1||flag==3)
	{
		cslputzscale(g,x_posit+MIKA_width_x,y_posit+MIKA_width_y,a,1.8); /* 文字を1.8倍の倍率で表示 */
	}
}
function diposit(g,flag)
// flag=0 キートップとキーの刻印文字を表示 
// flag=1 キートップのみ表示してキーの刻印は表示しない
// flag=2 キーの刻印のみを表示
// flag=3 キーの刻印を消去 
{
		dipline(g,0,MIKA_c_pos1,flag); /* 上一段 キーボード表示 */
		dipline(g,1,MIKA_c_pos2,flag); /* ホームポジション キーボード表示 */
		dipline(g,2,MIKA_c_pos3,flag); /* 下一段 キーボード表示 */
		dipline(g,3,MIKA_c_pos4,flag); /* 最下段 キーボード表示 */
}
function disperrorcount(g,flag,i,j) /* エラー入力回数表示 */
// flag=0 表示 flag=1 数値のみ消去 flag=2 メッセージと共に数値を消去
// i 表示位置縦行番号
// j 表示位置横列番号
	{
//		type_mes=String.format("ミスタッチ%3d回",MIKA_type_err_count); /* エラーカウントメッセージ作成 */
		var type_mes;
		type_mes='ミスタッチ'+formatd(MIKA_type_err_count,3)+'回'; /* エラーカウントメッセージ作成 */
		if(flag==0)
		{
 			cslcolor(g,MIKA_red); /* フラグが=0の時は表示色を赤色に設定 */
		}
		else if(flag==1)
		{
			cslcolor(g,MIKA_bk_color); /* フラグが=1の時は数値のみ表示を消去 */
		}
		else
		{
			cslcolor(g,MIKA_bk_color); /* フラグが=2の時はメッセージを含めて表示を消去 */
		}
		//		System.out.printf("i=%d j=%d",i,j);
		cslput(g,i*16,j*8,type_mes); /* 指定位置にエラーカウント表示 */
	}
function disperror(g,flag) /* ポジション練習エラー回数表示 */
// flag=0 表示 flag=1 数値のみ消去  flag=2 メッセージと共に数値を消去
	{
		disperrorcount(g,flag,3,64); /* 表示位置を指定してエラー回数表示 */
	}
function disperror1(g,flag) /* ランダム練習 エラー回数表示 */
// flag=0 表示 flag=1 消去  flag=2 メッセージと共に数値を消去
	{
		disperrorcount(g,flag,5,49); /* 表示位置を指定してエラー回数表示 */
	}
function dispseikai(g,flag) /* 正解数表示 */
// flag=0 表示 flag=1 数値のみ消去 flag=2 メッセージと共に数値を消去
{
		var type_mes;
		if(MIKA_type_count==0) return;
		type_mes='正解'+formatd(MIKA_type_count,3)+'回'; /* 正解数メッセージ作成 */
		if(flag==0)
		{
			cslcolor(g,MIKA_cyan); /* フラグが=0の時は表示色をシアンに設定 */
		}
		else if(flag==1)
		{
			cslcolor(g,MIKA_bk_color); /* フラグが=1の時は数値のみ表示を消去 */
		}
		else
		{
			cslcolor(g,MIKA_bk_color);  /* フラグが=2の時はメッセージを含めて表示を消去 */
		}
		cslput(g,2*16,64*8,type_mes); /* 正解数メッセージ表示 */
}
function dispkeygideonoff(g,flag) /* キーガイド表示オンオフメッセージ表示 */
// flag=1 前回のメッセージを消去してから今回のメッセージを表示
// flag=0 今回のメッセージのみを表示
	{
		var keymes1,keymes2;
		if(MIKA_menu_kind_flag==MIKA_key_guide_on) /* ガイドキー文字表示がオンの場合 */
		{
			keymes1=MIKA_keymes1; /* 表示メッセージに「スペースを押すとキーガイドを消去します」を指定 */
			keymes2=MIKA_keymes2; /* 消去メッセージに「スペースを押すとキーガイドを表示します」を指定 */
		}
		else /* ガイドキー文字表示がオフの場合 */
		{
			keymes1=MIKA_keymes2; /* 表示メッセージに「スペースを押すとキーガイドを表示します」を指定 */
			keymes2=MIKA_keymes1; /* 消去メッセージに「スペースを押すとキーガイドを消去します」を指定 */
		}
		if(flag==1)
		{
			cslcolor(g,MIKA_bk_color); /* メッセージの表示色を背景色に設定 */
			cslput(g,16,1,keymes2); /* 前回のメッセージを消去 */
		}
		cslcolor(g,MIKA_cyan); /* メッセージの表示色をシアンに設定 */
		cslput(g,16,1,keymes1); /* 今回のメッセージを表示 */
	}
function disptitle(g,mes,submes) /* 練習項目を画面上部に表示 */
// mes 練習種別メッセージ
// submes 練習項目メッセージ
	{
		var mes0;
		var a='%s';
		mes0=mes.replace(a,submes); /* 記号'%s'をsubmesで置換 */
		cslcolor(g,MIKA_magenta); /* 表示色をマゼンタに設定 */
		cslmencenter(g,1,mes0); /* 画面上部中央にメッセージを表示 */
//		System.out.printf(mes0);
	}
function dispkaisumes(g,flag,i,j) /* 練習回数表示 */
// flag=0 表示 flag=1 消去 
// i 表示位置縦行番号
// j 表示位置横列番号
	{
		var type_mes;
		var count;
		if(MIKA_p_count==null) return; /* 練習回数配列アドレスが空の時はリターン */
		count=MIKA_p_count[MIKA_type_kind_no]; /* 練習項目に対応する練習回数取り出し */
//		System.out.printf("count=%d  MIKA_type_kind_no=%d\n",count,MIKA_type_kind_no);
		if(count==0) return; /* 練習回数がゼロの時はリターン */
		if(flag==0) cslcolor(g,MIKA_green); /* フラグが=0の時は表示色を緑色に設定 */
		else cslcolor(g,MIKA_bk_color); /* フラグが=1の時は表示を消去 */
		type_mes="練習回数"+formatd(count,4)+"回"; /* 練習回数メッセージ作成 */
		cslput(g,i*16,j*8,type_mes); /* 練習回数メッセージ表示 */
	}
function dispkaisu(g,flag) /* ポジション練習 練習回数表示 */
// flag=0 表示 flag=1 消去 
	{
		dispkaisumes(g,flag,1,64);
	}
function dispkaisu2(g,flag) /* ランダム練習 練習回数表示 */
// flag=0 表示 flag=1 消去 
	{
		dispkaisumes(g,flag,1,31);
	}
function dispabortmessage(g,flag,i,j) /* 「ESCキーを押すと中断します」のメッセージを表示 */
// flag=0 表示 flag=1 消去 
// i 表示位置縦行番号
// j 表示位置横列番号
	{
		var ii,jj;
		if(flag==0) cslcolor(g,MIKA_cyan);  /* フラグが=0の時は表示色をシアンに設定 */
		else cslcolor(g,MIKA_bk_color); /* フラグが=1の時は表示を消去 */
		ii=i*16;
		jj=j*8;
		if(jj<=0) jj=1;
		cslput(g,ii,jj,MIKA_abort_mes);	/* 「ESCキーを押すと中断します」のメッセージを表示 */
	}
function dispabortmes(g,flag) /* ポジション練習で 「ESCキーを押すと中断します」のメッセージを表示 */
// flag=0 表示 flag=1 消去 
	{
		dispabortmessage(g,flag,2,0);
	}
function dispabortmes2(g,flag) /* ランダム練習 で 「ESCキーを押すと中断します」のメッセージを表示 */
// flag=0 表示 flag=1 消去 
	{
		dispabortmessage(g,flag,23,20);
	}
function dispsecond(g,flag) /* ポジション練習で練習時間秒を表示 */
// flag=0 表示 flag=1 消去 
	{
		var	type_mes;
		if(flag==0) cslcolor(g,MIKA_blue);  /* フラグが=0の時は表示色を青に設定 */
		else cslcolor(g,MIKA_bk_color); /* フラグが=1の時は表示を消去 */
		type_mes="今回は  "+formatd(MIKA_type_speed_time,4)+"秒かかりました"; /* 表示メッセージ作成 */
		cslput(g,2*16,1,type_mes); /* 練習時間秒のメッセージを表示 */
	}
function dispkeyguidonoffmes(g,flag)
//	「この次は、スペースキーを押してキーガイドの表示を消して練習してみましょうね」あるいは
//	「この次は、スペースキーを押してキーガイドを表示して練習してみましょうね」のメッセージを表示
// flag=0 表示 flag=1 消去 
	{
		if(flag==0) cslcolor(g,MIKA_green);  /* フラグが=0の時は表示色を緑に設定 */
		else cslcolor(g,MIKA_bk_color); /* フラグが=1の時は表示を消去 */
		if(MIKA_key_guide_flag==1) /* キーガイドメッセージ表示フラグが 1の場合 */
		cslput(g,20*16,2*8,MIKA_keymes3); /*「この次は、スペースキーを押してキーガイドの表示を消して練習してみましょうね」 のメッセージを表示 */
		else /* キーガイドメッセージ表示フラグが 2の場合 */
		cslput(g,20*16,2*8,MIKA_keymes4); /*「この次は、スペースキーを押してキーガイドを表示して練習してみましょうね」 のメッセージを表示 */
	}
function dispptrain(g,mestb) /* ポジション練習実行画面を表示 */
{
		cslclr(g); /* 画面クリア */
		disptitle(g,mestb,MIKA_type_kind_mes); /* 練習項目を表示 */
		if (MIKA_p_count[MIKA_type_kind_no]!=0) /* 練習回数がゼロでない場合 */
		{
			dispkaisu(g,0); /* 練習回数を表示 */
		}
		dispkeygideonoff(g,0); /* スペースキーを押すとキーガイドを消去しますのメッセージを表示 */
		if(MIKA_practice_end_flag==0) /* 練習実行中の場合 */
		{
			dispabortmes(g,0); /* エスケープキーを押すと中断しますのメッセージを表示 */
		}
		cslcolor(g,MIKA_cyan); /* 表示色をシアンに設定 */
		cslput(g,2*16,38*8,MIKA_key_type_mes); /* のキーを打ちましょうねのメッセージを表示 */
		dispguidechar(g,MIKA_key_char,0);	/* 練習文字を表示 */
		diposit(g,0); /*キーとキーの文字の刻印を表示 */
		dikposit(g,MIKA_guide_char,0); /* キーボードのガイドキーを表示 */
		pfinger(g,0); /* 指のイラストを表示 */
		difposit(g,MIKA_guide_char,0); /* ガイドキーの使用する指の指示を表示 */
}
function dispctable(g) /* ランダム練習 練習テキスト表示 */
	{
		var a;
		var i,j,k;
		var ii,jj;
		var kazu_yoko=40; /* 横文字数 */
		k=0;
		for(j=0;j<MIKA_cline_x;j++) /* 練習行数まで表示 */
		{
			for(i=0;i<MIKA_kazu_yoko;i++) /* 横一行36文字表示 */
			{
				if(k>=MIKA_cline_c) break; /* 練習文字数まで表示 */
				a=MIKA_chat_t[j][i]; /* 練習文字を取得 */
				jj=xxcord(j); /* 練習文字の縦位置を仮想座標に変換 */
				ii=yycord(i); /* 練習文字の横位置を仮想座標に変換 */
//				if(MIKA_err_char_flag==1&&j==MIKA_c_p2&&i==MIKA_c_p1) /* 練習文字がエラー文字の場合 */
//				{
//					cslcolor(g,Color.red); /* 表示色を赤に設定 */
//					dispbkchar(g,jj,ii,MIKA_random_scale); /* 文字の背景を赤色で表示 */
//				}
				cslcolor(g,MIKA_key_black); /* 表示色を黒に設定 */
				cslputzscale(g,jj,ii,a,MIKA_random_scale); /* 指定の位置に文字を表示 */
//				if(j<MIKA_c_p2||(j==MIKA_c_p2&&i<MIKA_c_p1)) /* 入力済の文字には下線を引く */
//				{
//					cslputu(g,jj,ii,"aa",1,MIKA_color_text_under_line);	
//				}
				k++; /* 表示文字数インクリメント */
			}
		}
	}
function dispmaxspeedrecord(g,i1,j1,i2,j2) /* ランダム練習 の 最高入力速度と 達成日を表示 */
	{
			var a,b;
			cslcolor(g,MIKA_green); /* 表示色を緑に設定 */
			a="最高入力速度"+formatf1(MIKA_type_speed_record[MIKA_type_kind_no],6)+"文字／分"; /* 最高速度メッセージ作成 */
			cslput(g,i1*16,j1*8,a); /* 最高速度メッセージ表示 */
			b="達成日 "+MIKA_type_date_record[MIKA_type_kind_no]; /* 達成日メッセージ作成 */
			cslput(g,i2*16,j2*8,b); /* 達成日メッセージ表示 */
	}
function disptrain(g,mest) /* ランダム練習 実行画面の表示 */
{
		cslclr(g); /* 画面クリア */
		disptitle(g,mest,MIKA_type_kind_mes); /* 練習項目を表示 */
		cslcolor(g,MIKA_cyan); /* 表示色をシアンに設定 */
		cslput(g,2*16,10*8,MIKA_kugiri_mes); /* 数字の区切り入力メッセージを表示 */
		cslcolor(g,MIKA_green); /* 表示色を緑に設定 */
		cslput(g,4*16,4*8,"制限時間60秒"); /* 制限時間を表示 */
		if (MIKA_p_count[MIKA_type_kind_no]!=0) /* 練習回数がゼロでない場合 */
		{
			dispkaisu2(g,0); /* 練習回数を表示 */
		}
		if(MIKA_type_speed_record[MIKA_type_kind_no]!=0.0) /* 最高入力速度がゼロでない場合 */
		{
			dispmaxspeedrecord(g,3,20,3,49);
		}
		dispctable(g); /* 練習文字を表示 */
		dispabortmes2(g,0); /* エスケープキーを押すと中断しますのメッセージを表示 */
}
function ppseiseki(g,i,j,menu_mes,r_speed,r_date,r_time) /* 成績表示 ランダム練習 表示 */
/* i 表示位置 j 表示個数 menu_mes 練習項目 r_speed 最高速度 r_date 達成日 r_time 累積練習時間 */
	{
		var ii;
		var a,b;
		for(ii=0;ii<j;ii++)
		{
			cslput(g,(i+ii*2)*16,1,menu_mes[ii+1]); /* 練習項目を表示 */
			if(r_speed[ii]!=0.0) /*最高入力速度が 0.0 でない場合 */
			{
				a=formatf1(r_speed[ii],6); /* 最高入力速度を文字列に変換 */
				cslput(g,(i+ii*2)*16,33*8,a); /* 最高入力速度を表示 */
				cslput(g,(i+ii*2)*16,44*8,r_date[ii]); /* 達成日を表示 */
			}
			b=tconv(r_time[ii]); /* 累積練習時間を文字列に変換 */
			cslput(g,(i+ii*2)*16,54*8,b); /* 累積練習時間を表示 */
		}
}
function dispseiseki(g) /* 成績表示 */
	{
		var i;
		var time_i;
		var a,aa,b;
		cslclr(g); /* 画面クリア */
		a=tconv(MIKA_rt_t); /* 前回までの合計練習時間を文字列に変換 */
		aa="前回までの練習時間　"+a; /* 前回までの合計練習時間のメッセージ作成 */
		cslcolor(g,MIKA_green); /* 表示色を緑色に設定 */
		cslput(g,1,1,aa); /* 前回までの合計練習時間を表示 */
		cslcolor(g,MIKA_blue); /* 表示色を青色に設定 */
		cslput(g,1,43*8,MIKA_return_mes); /* エスケープキーを押すとメニューに戻りますのメッセージを表示 */
		time_i=seisekiruiseki()-MIKA_rt_t; /* 今回の練習時間を秒で算出 */
		a=tconv(time_i); /* 今回練習時間を文字列に変換 */
		aa="今回の練習時間　　　"+a; /* 今回練習時間のメッセージを作成 */
		cslcolor(g,MIKA_green); /* 表示色を緑色に設定 */
		cslput(g,16,1,aa); /* 今回練習時間を表示 */
		cslcolor(g,MIKA_blue); /* 表示色を青色に設定 */
//		cslput(g,3*16,1,MIKA_mest2); /* 表示項目の表題を表示 */
		cslput(g,3*16,1,MIKA_mest2a); /* 練習項目の表題を表示 */
		cslput(g,3*16,19*8,MIKA_mest2b); /* タイプ速度　文字／分の表題を表示 */
		cslput(g,3*16,46*8,MIKA_mest2c); /* 達成日の表題を表示 */
		cslput(g,3*16,59*8,MIKA_mest2d); /* 累積練習時間の表題を表示 */
		cslcolor(g,MIKA_orange); /* 表示色をオレンジに設定 */
		b=tconv(MIKA_p_time); /* ポジション練習の累積練習時間を文字列に変換 */
		cslput(g,5*16,54*8,b); /* ポジション練習の累積練習時間を表示 */
		cslput(g,5*16,1,MIKA_menu_mes_s[0]); /* 練習項目「ポジション練習」を表示 */
		ppseiseki(g,7,3,MIKA_menu_mes_s,MIKA_r_speed,MIKA_r_date,MIKA_r_time); /* ランダム練習の成績を表示 */
	}
function dispmen(g) /* メニュー及び練習画面表示 */
{
	if (MIKA_exec_func_no==1) menexe(g,MIKA_menu_mes_s,MIKA_menu_cord_s,MIKA_menu_s_function,MIKA_menu_s_sel_flag,MIKA_mes0); /* 初期メニュー表示 */
	else if (MIKA_exec_func_no==29) dispseiseki(g); /* 成績表示 */
	else if(MIKA_exec_func_no>900&&MIKA_exec_func_no<1000) dispptrain(g,MIKA_mesta); /* ポジション練習の各項目の実行画面表示 */
	else if(MIKA_exec_func_no>1000&&MIKA_exec_func_no<1100) disptrain(g,MIKA_mesta); /* ランダム練習の各項目の実行画面表示 */
}
function menexe(g,menu_mes,menu_cord,menu_function,sel_flag,menut)
	{
		var i,j;
		var x;
		var y;
		mesi5="番号キーを押して下さい";
		MIKA_max_x_flag=0; /* 縦 25行モードに設定 */
		MIKA_max_y_flag=0; /* 横 80カラムモードに設定 */
		cslclr(g); /* 画面クリア */
		cslcolor(g,MIKA_magenta); /* 表示色をマゼンタに設定 */
		cslmencenter(g,1,menut); /* メニュータイトルを上端の中央に表示 */
		MIKA_max_x_flag=1; /* 縦 20行モードに設定 */
		MIKA_max_y_flag=1; /* 横 64カラムモードに設定 */
		cslcolor(g,MIKA_cyan);
		cslput(g,18*16,29*8,mesi5); /* 番号キーを押して下さいのメッセージを表示 */
		j=menu_mes.length;
		for(i=0;i<j;i++)
		{
			x=menu_cord[i][0]; /* メニュー表示位置 x座標取得 */
			y=menu_cord[i][1]; /* メニュー表示位置 y座標取得 */
			if(sel_flag[i]==1)	cslcolor(g,MIKA_green); /*前回選択メニュー項目は緑色で表示 */
			else 	cslcolor(g,MIKA_blue); /* その他のメニューは青色で表示 */
			cslput(g,x,y,menu_mes[i]); /* メニュー項目表示 */
			if(sel_flag[i]==1) cslputu(g,x,y,menu_mes[i],1,MIKA_green); /* 前回選択メニュー項目に下線を表示 */
			cslputzscale(g,x,y-4*MIKA_width_y,String.fromCharCode('1'.charCodeAt()+i),1.0); /* メニュー番号を表示 */
		}
		MIKA_menu_function_table=menu_function; /* 機能番号テーブル設定 */
		MIKA_sel_flag=sel_flag; /* 前回選択メニュー項目選択フラグアドレス設定 */
		MIKA_max_x_flag=0; /* 縦 25行モードに戻す */
		MIKA_max_y_flag=0; /* 横 80カラムモードに戻す */
}
function mencom(menu_function_table,sel_flag,nChar) /* 選択されたメニューの項目に対応する機能番号を取得 */
	{
		var func_no=0;
		var i,ii,iii;
		var sel_flag1=0;
		if(menu_function_table==0) return(0);
		ii=menu_function_table.length;
		if(nChar==0x1b){ /* 入力文字がエスケープの場合 */
			for(i=0;i<ii;i++) /* メニューに戻りますのメニュー項目をサーチ */
			{
				if(menu_function_table[i]>9000&&menu_function_table[i]<9999) /* メニューに戻りますのメニュー項目があった場合 */  
				{
					func_no=menu_function_table[i];
				}
			}
			return(func_no);
		}
		else if(nChar<='0'||nChar>'9') return(0); /* 入力文字が1～9の数字以外は処理をしないでリターン */
		else
		{
			iii=nChar.charCodeAt()-0x31; /* 文字を数字に変換 */
			if(iii<ii) /* 入力された数字に対応するメニューがある場合 */
			{
				func_no=menu_function_table[iii]; /* 対応する機能番号を取り出す */
				for(i=0;i<ii;i++)
				{
						if(sel_flag[i]!=0) sel_flag1=i+1; /* 前回選択メニュー項目番号をサーチ */
				}
				if(0<func_no&&func_no<9000) /* 今回選択メニューがメニューに戻るで無い場合 */
				{
					if(sel_flag1!=0) sel_flag[sel_flag1-1]=0; /*前回選択メニュー番号をクリア */
					sel_flag[iii]=1; /* 今回の選択メニュー番号を前回選択メニュー番号に設定 */
				}
				return(func_no);
			}
			else
			return(0);
		}	
	}	
function exec_func(g,nChar) /* 一文字入力に対応した処理を行う */
	{
		var func_no;
		func_no=mencom(MIKA_menu_function_table,MIKA_sel_flag,nChar); /* 選択されたメニューの項目に対応する機能番号を取得 */
		if(func_no!=0) /* メニュー表示中に数字キーが押されて対応する機能番号がゼロでない場合 */
		{
			MIKA_menu_function_table=0;
			MIKA_exec_func_no=func_no;
			if(MIKA_exec_func_no==9999) procexit(); /* 機能番号が 9999の時は終了 */
			if (MIKA_exec_func_no>9000) MIKA_exec_func_no=MIKA_exec_func_no-9000; /* 機能番号がメニューに戻るの時は、メニュー番号を取得 */
			if(MIKA_exec_func_no==30)
			{
					if(window.confirm("成績を消去してもいいいですか")) /* 成績を消去してもいいですかのダイアログを表示 */
					{
						seisekiclear(); /* 成績をクリア */
					}
					MIKA_exec_func_no=1; /* 初期メニューのメニュー番号設定 */
			}
			else
			{
				if(MIKA_exec_func_no>900&&MIKA_exec_func_no<1100) /* 機能番号が練習メニューの実行の場合は各練習の項目ごとに前処理を行う */
				{
					preptrain(MIKA_exec_func_no); /* 練習の各項目ごとの前処理 */
				}
			}
			dispmen(g); /* メニュー、練習画面表示 */
			return(1);
		}
		else /* 練習の実行中にキーが押された場合 */
		{
			if(nChar==0x1b&&MIKA_exec_func_no==29) /* 成績表示中にエスケープキーが押された場合 */
			{
				MIKA_exec_func_no=1; /* 初期メニューのメニュー番号設定 */
				dispmen(g); /* メニュー表示 */
				return(1);
			}
			if(MIKA_exec_func_no>900&&MIKA_exec_func_no<1000) /* ポジション練習 */
			{
				procptrain(g,nChar); /* ポジション練習 文字入力処理 */
				return(1);
			}
			if(MIKA_exec_func_no>1000&&MIKA_exec_func_no<1100) /* ランダム練習 */
			{
				proctrain(g,nChar); /* ランダム練習 文字入力処理 */
				return(1);
			}
		}
		return(0);
	}
function preptrain(func_no) /* 練習の前処理 */
	{
			if(MIKA_exec_func_no>900&&MIKA_exec_func_no<1000) /* ポジション練習の前処理 */
			{
				MIKA_type_kind_no=func_no-901; /* 練習項目番号を取得 */
				MIKA_cookie_kind='P'; /* 練習成績クッキー保存用タグ種別 */
				MIKA_practice_end_flag=0; /* 練習実行中フラグクリア */	
				MIKA_menu_kind_flag=MIKA_key_guide_on; /* キーガイドを表示するモードに指定 */
				MIKA_key_guide_flag=0; /* 練習終了時に「この次はスペースキーを押してキーガイドを表示してあるいは消去して練習しましょうね」の表示を行うフラグ を消去 */
				MIKA_type_end_flag=0; /* 練習終了フラグをクリア */
				MIKA_time_start_flag=0; /* 時間計測開始フラグをクリア */
				MIKA_type_kind_mes=MIKA_menu_mes_s[MIKA_type_kind_no]; /* 練習項目名を設定 */
				MIKA_p_count=MIKA_p_count_position; /* 練習回数配列アドレスにポジション練習 練習回数 を設定 */
				MIKA_char_table=MIKA_h_pos[MIKA_type_kind_no]; /* 練習文字列テーブルアドレスに ポジション練習 ランダム練習 練習文字列テーブルの指定項目を設定 */
				MIKA_char_position=randomchar(MIKA_char_table,-1); /* 最初の練習文字の練習文字テーブル内番号をランダムに取得 */
				MIKA_key_char=MIKA_char_table.charAt(MIKA_char_position); /* 練習文字テーブル内番号に対応する練習文字を取得 */
				MIKA_guide_char=MIKA_key_char; /* ガイドキー文字に練習文字を設定 */
				MIKA_err_char=0; /* エラー文字にゼロを指定 */
				MIKA_type_err_count=0; /* エラー文字カウンターをゼロクリア */
				MIKA_type_count=0; /* 練習文字カウンターをゼロクリア */
			}
			if(MIKA_exec_func_no>1000&&MIKA_exec_func_no<1100) /* ランダム練習の前処理 */
			{
				MIKA_type_kind_no=func_no-1001; /* 練習項目番号を取得 */
				MIKA_cookie_kind='R'; /* 練習成績クッキー保存用タグ種別 */
				MIKA_type_speed_record=MIKA_r_speed; /* 最高速度記録配列アドレスに ランダム練習 最高速度記録 を設定 */
				MIKA_type_date_record=MIKA_r_date; /* 最高速度達成日配列アドレスに  ランダム練習 最高速度達成日付 を設定 */
				MIKA_type_time_record=MIKA_r_time;  /* 累積練習時間配列アドレスに ランダム練習 累積練習時間 を設定 */
				MIKA_p_count=MIKA_p_count_random; /* 練習回数配列アドレスにランダム練習 練習回数 を設定 */
				MIKA_practice_end_flag=0; /* 練習実行中フラグクリア */	
				MIKA_type_kind_mes=MIKA_menu_mes_s[MIKA_type_kind_no+1]; /* 練習項目名を設定 */
				MIKA_char_table=MIKA_h_pos[MIKA_type_kind_no+1]; /* 練習文字列テーブルアドレスに ポジション練習 ランダム練習 練習文字列テーブルの指定項目を設定 */
				inctable(MIKA_char_table,MIKA_type_speed_record[MIKA_type_kind_no]); /* ランダム練習 練習テキスト作成 */
				prepflags(0); /* 練習フラグ初期化 */
			}
	}
function keyguideoff(g) /* ポジション練習のキーガイドをオフにする */
	{
			dispkeygideonoff(g,1); /* スペースキーを押すとキーガイドを表示しますのメッセージを表示 */
			diposit(g,3); /* キーボードイラストの刻印を消去する */
			MIKA_guide_char=0; /* ガイドキー文字にゼロを設定 */
			dikposit(g,MIKA_err_char,3); /* エラー文字を表示する */
	}
function keyguideon(g) /* ポジション練習のキーガイドをオンにする */
	{
			dispkeygideonoff(g,1); /* スペースキーを押すとガイドキーを消去しますのメッセージを表示 */
			diposit(g,2); /* キーボードイラストの刻印を表示する */
			MIKA_guide_char=MIKA_key_char; /* ガイドキー文字に練習文字を設定*/
			dikposit(g,MIKA_guide_char,0); /* ガイドキー文字を表示する */
			dikposit(g,MIKA_err_char,3); /* エラー文字を表示する */
	}
function dispretrymessage(g,flag) /* リトライメッセージ表示 flag=0 表示を行う flag=1 表示を消去 */
{
	if(flag==0) cslcolor(g,MIKA_cyan); /* 表示色をシアンに設定 */
	else cslcolor(g,MIKA_bk_color); /* 表示色を背景色に設定 */
	cslput(g,22*16,18*8,MIKA_mesi1); /* 「もう一度練習するときはリターンキーまたは、Enterキーを押してください」のメッセージを表示 */
	cslput(g,23*16,18*8,MIKA_mesi2); /* 「メニューに戻るときはESCキーを押してください」のメッセージを表示 */
}
function funcbackmenu(func_no) /* メニューの階層を一段上に戻る */
	{
		var ffun_no=0;
		ffun_no=1; /* 初期メニューに戻る */
		return ffun_no;
	}
function procpabort(g) /*エスケープで終了しますの表示消去  指表示消去 リトライメッセージ表示 */
{
	dispabortmes(g,1); /* エスケープで終了しますの表示消去 */
	pfinger(g,1); /* 指のイラストを消去 */
	dispretrymessage(g,0); /* リトライメッセージ表示 */
	}
function procpnextchar(g) /* ポジション練習での次回の練習文字の表示処理 */
{
	if(MIKA_menu_kind_flag==MIKA_key_guide_off) /* キーガイド表示がオフの場合 */
	{
		dikposit(g,MIKA_err_char,2); /* エラー文字表示をキーの刻印なしで消去 */
		dikposit(g,MIKA_guide_char,2); /* ガイドキー文字表示をキーの刻印なしで消去 */
		if(MIKA_guide_char!=0) /* ガイドキー文字表示中の場合 */
		difposit(g,MIKA_guide_char,1); /* 指の位置表示を消去 */
	}
	else
	{
		dikposit(g,MIKA_err_char,1); /* エラー文字表示をキーの刻印ありで消去 */
		dikposit(g,MIKA_guide_char,1); /* ガイドキー文字表示をキーの刻印ありで消去 */
		difposit(g,MIKA_guide_char,1); /* 指の位置表示を消去 */
	}
	MIKA_err_char=0; /* エラー文字にゼロを指定 */		
	dispguidechar(g,MIKA_key_char,1); /* 練習文字表示を消去 */
	MIKA_char_position=randomchar(MIKA_char_table,MIKA_char_position); /* 最初の練習文字の練習文字テーブル内番号をランダムに取得 */
	MIKA_key_char=MIKA_char_table[MIKA_char_position]; /* 練習文字テーブル内番号に対応する練習文字を取得 */
	if(MIKA_menu_kind_flag==MIKA_key_guide_on) MIKA_guide_char=MIKA_key_char; /* キーガイド表示中の場合はガイドキー文字に練習文字を代入 */
	else MIKA_guide_char=0; /* キーガイド表示なしの場合はガイドキー文字にゼロを代入 */
	dispguidechar(g,MIKA_key_char,0); /* 次回練習文字を表示 */
	dikposit(g,MIKA_guide_char,0); /* ガイドキー文字の位置を表示 */
	difposit(g,MIKA_guide_char,0); /* ガイドキー文字の指位置を表示 */
}
function convertupperlower(a,b) /* b の文字の種別をa の文字種別に揃える */
{
	var char1='A';
	var char2='a';
	if('A'<=a&&a<='Z'&&'a'<=b&&b<='z') b=String.fromCharCode(nChar.charCodeAt(0)-char2.charCodeAt(0)+char1.charCodeAt(0)); /* aが大文字でbが小文字の場合はbを大文字に変換 */
	else	if('a'<=a&&a<='z'&&'A'<=b&&b<='Z') b=String.fromCharCode(nChar.charCodeAt(0)-char1.charCodeAt(0)+char2.charCodeAt(0)); /* aが小文字でbが大文字の場合はbを小文字に変換 */
	return b;
}
function procptrain(g,nChar) /* ポジション練習の文字入力処理 */
{
	if(nChar==' ') /* 入力文字がスペースの場合 */
	{
		if(MIKA_practice_end_flag==0) /* 入力練習実行中の場合 */
		{
				if(MIKA_menu_kind_flag==MIKA_key_guide_on) /* キーガイド表示中の場合 */
				{
					MIKA_menu_kind_flag=MIKA_key_guide_off; /* キーガイド表示フラグをキーガイド表示無しに設定 */
					if(MIKA_type_count==0) MIKA_Procptimer=setTimeout(Procptimer,3000,g); /* 最初の文字はタイマーを三秒に設定 */
					else  MIKA_Procptimer=setTimeout(Procptimer,2000,g); /* 二度め以降はタイマーを二秒に設定 */
					difposit(g,MIKA_guide_char,1); /* 練習文字に対応した指の爪の表示を消去 */
					keyguideoff(g); /* ポジション練習のキーガイドをオフにする */
				}
				else
				{
					if(MIKA_guide_char==0){ /* ガイドキー文字位置が未表示の場合 */
						clearTimeout(MIKA_Procptimer); /* タイマーキャンセル */
					}
					MIKA_menu_kind_flag=MIKA_key_guide_on; /* キーガイド表示フラグをキーガイド表示無しに設定 */
					keyguideon(g); /* ポジション練習のキーガイドをオフにする */
					difposit(g,MIKA_guide_char,0); /* 練習文字に対応した指の爪の位置を表示 */				
				}
		}
		else if(MIKA_practice_end_flag==1){ /* 練習終了時の場合 */
			if(MIKA_menu_kind_flag==MIKA_key_guide_on){ /* キーガイド表示中の場合 */
				MIKA_menu_kind_flag=MIKA_key_guide_off; /* キーガイド表示フラグをキーガイド表示無しに設定 */
					keyguideoff(g); /* ポジション練習のキーガイドをオフにする */
			}
			else /* キーガイド表示無しの場合 */
			{
				MIKA_menu_kind_flag=MIKA_key_guide_on; /* キーガイド表示フラグをキーガイド表示ありに設定 */
				keyguideon(g); /* ポジション練習のキーガイドをオンにする */
			}
		}
	}
	else if(nChar==0x1b){ /* エスケープキー入力の場合 */
		if(MIKA_practice_end_flag==0) /* 入力練習実行中の場合 */
		{
			MIKA_practice_end_flag=1; /* 練習実行中フラグを終了にセット */
			if(MIKA_menu_kind_flag==MIKA_key_guide_off&&MIKA_guide_char==0) /* キーガイド表示無しでガイドキー文字文位置未表示の場合 */
			{
				clearTimeout(MIKA_Procptimer); /* ガイドキー文字位置表示用タイマーキャンセル */
			}
			if(MIKA_time_start_flag!=0) /* 最初の正解を入力済の場合 */
			{
				MIKA_type_end_time=getmillisecond();
				MIKA_type_speed_time=roundtime((MIKA_type_end_time-MIKA_type_start_time)/1000.0);/* 練習経過時間 秒を計算 */
				MIKA_p_time=MIKA_p_time+MIKA_type_speed_time; /* 累積練習時間の記録を加算 */
				writecookiep(MIKA_p_time); /* 累積練習時間をクッキーに書き込み */
			}
			procpabort(g);
		}
		else if(MIKA_practice_end_flag==1) /* 練習終了の場合 */
		{
			MIKA_exec_func_no=funcbackmenu(MIKA_exec_func_no); /* メニューを一階層戻る */
			dispmen(g); /* メニュー表示 */
		}
	}
	else if((nChar==0x0d||nChar==0x0a)&&MIKA_practice_end_flag==1)	 /* 練習の終了時にTabが入力された場合 */
	{
		MIKA_practice_end_flag=0; /* 練習実行中フラグをクリア */
		dispkeyguidonoffmes(g,1); /* この次はキーガイドを表示して練習しましょう、キーガイドを消去して練習しましょうの表示を消去 */
	 	dispretrymessage(g,1); /* リトライメッセージ消去 */
		dispsecond(g,1); /* 前回練習時間表示消去 */
		dispabortmes(g,0); /* エスケープキーを押すと中断しますのメッセージを表示 */
		pfinger(g,0); /* 指のイラストを表示 */
		dispseikai(g,2); /* メッセージと共に前回正解数消去 */
		MIKA_key_guide_flag=0; /* キーガイドメッセージ表示フラグ クリア */
		MIKA_type_count=0; /* 入力文字数カウンタークリア */
		disperror(g,2); /* メッセージと共に前回エラー回数を消去 */
		MIKA_type_err_count=0; /* エラー入力文字数数クリア */
		MIKA_time_start_flag=0; /* 時間計測開始フラグクリア */
		procpnextchar(g); /* 次回の練習文字を表示 */
		if(MIKA_menu_kind_flag==MIKA_key_guide_off) /* キーガイド非表示の場合 */
		{
			MIKA_Procptimer=setTimeout(Procptimer,3000,g);  /* 最初の文字はタイマーを三秒に設定 */
		}
	}
	else if(MIKA_practice_end_flag==0) /* 練習実行中の場合 */
	{
		if(uppertolower(nChar)==uppertolower(MIKA_key_char)) /* 練習文字と入力文字を小文字に変換して比較 */
		{
			if(MIKA_menu_kind_flag==MIKA_key_guide_off&&MIKA_guide_char==0) /* キーガイド非表示ガイドキー文字位置未表示の場合 */
			{
				clearTimeout(MIKA_Procptimer); /* タイマーキャンセル */
			}
			dispseikai(g,1); /* 前回正解数表示消去 */
			if(MIKA_time_start_flag==0) /* 最初の正解文字入力の場合 */
			{
				MIKA_type_start_time=getmillisecond();  /* 練習開始時間をミリ秒で取得取得 */
				MIKA_time_start_flag=1; /* 練習時間計測フラグセット */
			}
			MIKA_type_count++; /* 正解数を加算 */
			dispseikai(g,0); /* 正解数を表示 */
			if(MIKA_type_count>=MIKA_position_limit) /* 60文字入力した場合は練習を終了 */
			{
				MIKA_type_end_time=getmillisecond(); /* 練習終了時間をミリ秒で取得取得 */
				MIKA_type_speed_time=roundtime((MIKA_type_end_time-MIKA_type_start_time)/1000.0); /* 練習経過時間を計算 */
				MIKA_p_time=MIKA_p_time+MIKA_type_speed_time; /* 累積練習時間の記録を加算 */
				writecookiep(MIKA_p_time); /* 累積練習時間をクッキーに書き込み */
				if(MIKA_menu_kind_flag==MIKA_key_guide_off) /* キーガイド表示がオフの場合 */
				{
					dikposit(g,MIKA_err_char,2); /* エラー文字表示をキーの刻印なしで消去 */
				}
				else
				{
					dikposit(g,MIKA_err_char,1); /* エラー文字表示をキーの刻印ありで消去 */
				}
				MIKA_err_char=0; /* エラー文字にゼロを指定 */		
				procpabort(g);
				MIKA_practice_end_flag=1; /* 練習実行中フラグを終了にセット */
				MIKA_type_end_flag=1; /* 練習終了フラグを60文字入力による終了にセット */
				dispkaisu(g,1); /* 前回練習回数表示クリア */
				MIKA_p_count[MIKA_type_kind_no]++; /* 練習回数加算 */
				dispsecond(g,0); /* 今回練習時間表示 */
				dispkaisu(g,0); /* 今回練習回数表示 */
				if(MIKA_type_err_count<=5&&MIKA_menu_kind_flag==MIKA_key_guide_on) /* エラー回数が5以下でキーガイド表示ありの場合 */
				{
					MIKA_key_guide_flag=1;
					dispkeyguidonoffmes(g,0); /* 「この次は、スペースキーを押してキーガイドの表示を消して練習してみましょうね」メーセージを表示 */
				}
				else if(MIKA_type_err_count>=15&&MIKA_menu_kind_flag==MIKA_key_guide_off) /* エラー回数が15以上でキーガイド表示なしの場合 */
				{
					MIKA_key_guide_flag=2;
					dispkeyguidonoffmes(g,0); /* 「この次は、スペースキーを押してキーガイドを表示して練習してみましょうね」のメッセージを表示 */
				}
			}
			else
			{
				procpnextchar(g); /* 次練習文字を取得して表示 */
				if(MIKA_menu_kind_flag==MIKA_key_guide_off) /* キーガイド表示なしの場合 */
				{
					MIKA_Procptimer=setTimeout(Procptimer,2000,g);  /* 二秒タイマー設定 */

				}
			}
		}
		else /* 入力エラーの場合 */
		{
			disperror(g,1); /* 前回エラー入力文数表示を消去 */
			MIKA_type_err_count++; /* エラー入力文字数カウンターを加算 */
			disperror(g,0); /* 今回エラー入力文字数を表示 */
			if(MIKA_menu_kind_flag==MIKA_key_guide_off) dikposit(g,MIKA_err_char,2); /* キーガイド表示なしの時は前回エラー入力文字を消去 */
			else dikposit(g,MIKA_err_char,1); /* キーガイド表示中は 前回エラー入力文字の赤色エラー表示を元に戻す */
			MIKA_err_char=convertupperlower(MIKA_key_char,nChar); /* エラー文字の文字種 大文字小文字 を練習文字と合せる。 */
			dikposit(g,MIKA_err_char,3); /* エラー入力文字位置を背景赤で表示 */
		}
	}
}
function dispbkchar(g,i,j,scale) /* ランダム練習 で練習文字の背景を表示 */
	{
		var xx,yy;
		var xx1,xx2,yy1,yy2;
		var font_size;
		font_size=cslfontsize(scale); /* 文字フォントサイズ取得 */
		xx1=xcord(i);	/* 左上 x 座標を 仮想座標から実座標に変換 */ 
		xx2=xcord(i+16);	/* 右下 x 座標を 仮想座標から実座標に変換 */
		xx=(xx2+xx1-font_size)/2; /* 四角表示 左上 x 座標取得 */
		xx=Math.floor(xx);
		yy1=ycord(j);	/* 左上 y 座標を 仮想座標から実座標に変換 */
		yy2=ycord(j+16);	 /* 右下 y 座標を 仮想座標から実座標に変換 */
		yy=(yy2+yy1-font_size)/2; /* 四角表示 左上 y座標取得 */
		yy=Math.floor(yy);
		g.fillRect(yy,xx,font_size,font_size);	/*四角を描画 */
	}
function disperrchar(g,flag) /* ランダム練習 で エラー文字を表示 */
// flag=1 赤色背景で表示
// flag=0 背景白色で表示
	{
		var ii,jj;
		var color1,color2;
		if(flag==1) /* エラー文字を背景赤色で表示する場合 */
		{
			color1=MIKA_key_red; /* 背景色を赤色に指定 */
			color2=MIKA_key_black; /* 文字色を黒色に指定 */
		}
		else /* エラー文字を背景白色で再表示する場合 */
		{
			color1=MIKA_bk_color; /* 背景色を白色に指定 */
			color2=MIKA_key_black; /* 文字色を黒色に指定 */
		}
		cslcolor(g,color1); /* 背景色の設定 */
		ii=xxcord(MIKA_c_p2); /* 練習文字の縦位置を実座標に変換 */
		jj=yycord(MIKA_c_p1); /* 練習文字の横位置を実座標に変換 */
		dispbkchar(g,ii,jj,MIKA_random_scale);	/* 四角い文字を背景に表示 */
		cslcolor(g,color2); /* 文字色の設定 */
		cslputzscale(g,ii,jj,MIKA_chat_t[MIKA_c_p2][MIKA_c_p1],MIKA_random_scale); /* 練習文字を表示 */
	}
function dispspeedrate(g,flag) /* ランダム練習 入力速度表示 */
// flag=0 表示 flag=1 消去
	{
		var a;
		var offset;
		if(flag==0)
		{
			cslcolor(g,MIKA_blue); /* flagが=ゼロの時は青色で表示 */
			offset=0;
		}
		else
		{
			cslcolor(g,MIKA_bk_color); /* flagが=1の場合は表示消去 */
			offset=0;
		}
		a="入力速度"+formatf1(MIKA_type_speed,6)+"文字／分"; /* 入力速度を文字列に変換 */
		cslput(g,5*16,(24+offset)*8,a); /* 入力速度を表示 */
	}
function ftypespeed(count,start_time,end_time) /* 一分間あたりのタイプ速度を計算 */
// count 文字数
// start_time 開始時間 ミリ秒
// end_time 終了時間 ミリ秒
	{
		var speed_rate;
		if(end_time==start_time) speed_rate=0.0; /* 開始時間と終了時間が一致する場合はタイプ速度をゼロに指定 */
		else
		{
			speed_rate=1000.0*60.0*count/(end_time-start_time); /* 一分間あたりのタイプ速度を計算 */
		}
		return speed_rate;
	}
function mesdisptime(u_flag,flag,type_speed_time) /* 練習経過時間文字列作成 */
// u_flag=0 練習経過時間を2桁の整数で表示 flag=1 練習経過時間を小数点以下二桁まで表示
	{
		var a;
		if(u_flag==0) /* 打ち切りフラグがゼロの場合 */
		{
				a="経過時間"+formatd(type_speed_time,2)+"秒"; /* 練習経過時間を整数で表示 */
		}
		else /* 打ち切りフラグが1の場合 */
		{
				a="経過時間"+formatf2(type_speed_time,5)+"秒"; /* 練習経過時間を小数点以下二桁まで表示 */
		}
		return a;
	}
function disptime(g,flag) /* ランダム練習 にて練習経過時間を表示 */
// flag=0 表示 flag=1 消去 
	{
		var a;
		var offset;
		if(flag==0) /* 青色で練習経過時間を表示 */
		{
			cslcolor(g,MIKA_blue); /* 表示色を青に設定 */
			a=mesdisptime(MIKA_utikiri_flag,flag,MIKA_type_speed_time); /* 練習経過時間文字列作成 */
			offset=0;
		}
		else /* 前回の練習経過時間表示を消去 */
		{
			cslcolor(g,MIKA_bk_color); /* 表示色を背景色に設定 */
			a=mesdisptime(MIKA_utikiri_flag2,flag,MIKA_type_speed_time); /* 練習経過時間文字列作成 */
			offset=0;
		}
		cslput(g,5*16,(4+offset)*8,a); /* 文字列の表示あるいは消去 */
	}
function prepflags(flag) /* ランダム練習 の開始時のフラグクリア処理 */
{
	MIKA_c_p1=0; /* 練習文字 横座標 クリア */
	MIKA_c_p2=0; /* 練習文字 縦座標 クリア */
	MIKA_type_count=0; /* 入力文字数カウンター クリア */
	MIKA_type_err_count=0; /* エラー入力文字数カウンター クリア */
	MIKA_err_char_flag=0; /* エラー入力フラグ クリア */
	MIKA_type_speed=0.0; /* 文字入力速度 クリア */
	MIKA_type_speed_time=0.0; /* 前回 練習経過時間 クリア */
	MIKA_ttype_speed_time=0.0; /* 今回 練習経過時間 クリア */
	MIKA_time_start_flag=0; /* 時間計測開始フラグ クリア */
	MIKA_utikiri_flag=0; /* 練習テキスト打ち切りフラグ クリア */
	MIKA_utikiri_flag2=0; /* 前回速度表示時の打ち切りフラグ クリア */
	MIKA_type_syuryou_flag=0; /* 練習終了時の記録更新フラグ クリア */
	MIKA_sec_count=0; /* 秒カウンター クリア */
}		
function dispupmes(g) /* タイプ速度を更新したときのメッセージを表示 */
	{
		cslcolor(g,MIKA_green); /* 表示色を緑色に設定 */
		cslput(g,20*16,20*8,MIKA_mesi3); /* 指定位置に「おめでとう、記録を更新しました」のメッセージを表示 */
	}
function proctrainexit(g)/* ランダム練習 の練習終了時の表示更新 */
	{
			dispkaisu2(g,1); /* 前回練習回数の表示を消去 */
			MIKA_p_count[MIKA_type_kind_no]++; /* 練習回数を加算 */
			dispkaisu2(g,0); /* 今回練習回数を表示 */
			dispabortmes2(g,1); /* エスケープキーを押すと中断しますのメッセージを消去 */
			dispretrymessage(g,0); /* リトライメッセージを表示 */
	}
function prockiroku(g) /* ランダム練習 にてタイプ入力速度が前回までの最高速度を更新したかの比較を行う */
	{
		if(MIKA_type_speed_record[MIKA_type_kind_no]<MIKA_type_speed) /* 前回までの最高入力速度を更新した場合 */
		{
			if(MIKA_type_speed_record[MIKA_type_kind_no]>0.0) /* 前回の最高入力速度がゼロより大きい場合 */
			{
				dispupmes(g); /* 練習記録を更新しましたのメッセージを表示 */
				MIKA_type_syuryou_flag=2; /* 練習記録更新フラグを2にセット */
			}
			else /* 前回の最高入力速度がゼロの場合 */
			{
				MIKA_type_syuryou_flag=1; /* 練習記録更新フラグを1にセット */
			}
			MIKA_type_date=getdate(); /* 最高記録達成日時文字列を指定フォーマットに従って作成 */
			writecookier(MIKA_cookie_kind,MIKA_type_kind_no,MIKA_type_speed,MIKA_type_date,MIKA_type_time_record[MIKA_type_kind_no]); /* クッキーに最高速度と達成日 累積練習時間を保存 */
		}
		else
		{
			writecookier(MIKA_cookie_kind,MIKA_type_kind_no,MIKA_type_speed_record[MIKA_type_kind_no],MIKA_type_date_record[MIKA_type_kind_no],MIKA_type_time_record[MIKA_type_kind_no]); /* クッキーに累積練習時間を保存 */
		}
	}
function procdispspeed(g) /* ランダム練習 入力速度表示 */
	{
			disptime(g,1); /* 前回練習経過時間表示を消去 */
			dispspeedrate(g,1); /* 前回 入力速度表示を消去 */
			MIKA_type_speed_time=MIKA_ttype_speed_time; /* 練習経過時間を更新 */
 			MIKA_type_speed=ftypespeed(MIKA_type_count,MIKA_type_start_time,MIKA_type_end_time); /* 入力速度を計算 */
			disptime(g,0); /* 今回練習経過時間を表示 */
			dispspeedrate(g,0); /* 今回入力速度を表示 */
	}
function roundtime(time) /* 小数点以下 切り捨て */
	{
		time=Math.floor(time);
		return time;
	}
function proctrain(g,nchar) /* ランダム練習 の文字入力処理 */
{
	if(nChar==0x1b){ /* エスケープキー入力の場合 */
			if(MIKA_practice_end_flag==0) /* 入力練習実行中の場合 */
			{
				MIKA_practice_end_flag=1; /* 練習実行中フラグを終了にセット */
				if(MIKA_time_start_flag==1) /* 最初の正解を入力済で制限時間のタイマーを開始済の場合 */
				{
					clearInterval(MIKA_Procrtimer);	 /* 制限時間60秒のタイマーをキャンセル */				
					MIKA_type_end_time=getmillisecond(); /* 終了時間をミリ秒で取得 */
					MIKA_ttype_speed_time=(MIKA_type_end_time-MIKA_type_start_time)/1000.0; /* 練習時間 秒を計算 */
					if(MIKA_ttype_speed_time<=0.0)MIKA_ttype_speed_time=1.0; /* 練習時間がゼロ以下の場合は1に設定 */
					MIKA_type_time_record[MIKA_type_kind_no]=MIKA_type_time_record[MIKA_type_kind_no]+roundtime(MIKA_ttype_speed_time); /* 累積練習時間の記録を加算 */
					writecookier(MIKA_cookie_kind,MIKA_type_kind_no,MIKA_type_speed_record[MIKA_type_kind_no],MIKA_type_date_record[MIKA_type_kind_no],MIKA_type_time_record[MIKA_type_kind_no]); /* クッキーに累積練習時間を保存 */
				}
				dispabortmes2(g,1); /* エスケープキーで終了しますの表示を消去 */
				dispretrymessage(g,0); /* 練習リトライメッセージ表示 */					
			}
			else
			{
				if(MIKA_type_syuryou_flag==1||MIKA_type_syuryou_flag==2) /* 練習記録を更新した場合 */
				{
					MIKA_type_speed_record[MIKA_type_kind_no]=MIKA_type_speed;	/* 練習記録 最高入力速度を更新 */
					MIKA_type_date_record[MIKA_type_kind_no]=MIKA_type_date; /* 練習記録 達成日を更新 */
				}
				MIKA_exec_func_no=funcbackmenu(MIKA_exec_func_no);	/* メニューを一階層戻る */
				dispmen(g); /* メニュー表示 */
			}
	}
	else if((nChar==0x0d||nChar==0x0a)&&MIKA_practice_end_flag==1)	 /* 練習の終了時にTabが入力された場合 */
	{
			MIKA_practice_end_flag=0; /* 練習実行中フラグクリア */
			if(MIKA_type_syuryou_flag==1||MIKA_type_syuryou_flag==2)	 /* 練習記録を更新した場合 */
			{
					MIKA_type_speed_record[MIKA_type_kind_no]=MIKA_type_speed; /* 練習記録 最高入力速度を更新 */
					MIKA_type_date_record[MIKA_type_kind_no]=MIKA_type_date; /* 練習記録 達成日を更新 */
			}
			inctable(MIKA_char_table,MIKA_type_speed_record[MIKA_type_kind_no]); /* ランダム練習 練習テキスト作成 */
			prepflags(0); /* 練習フラグ初期化 */
			dispmen(g); /* 画面表示 */
	}
	else if(MIKA_practice_end_flag==0) /* 練習実行中の場合 */
	{
		if(MIKA_time_start_flag==1) /* 最初の正解を入力済の場合 */
		{
			MIKA_type_end_time=getmillisecond();  /*終了時間をミリ秒で取得 */
			MIKA_ttype_speed_time=(MIKA_type_end_time-MIKA_type_start_time)/1000.0; /* 練習時間 秒を計算 */
		}
		MIKA_key_char=MIKA_chat_t[MIKA_c_p2][MIKA_c_p1];
		if((uppertolower(nChar)==uppertolower(MIKA_key_char))||((nChar==MIKA_return_code)&&(MIKA_key_char==MIKA_space_code))) /* 入力文字と練習文字を小文字に変換して比較 */
		{
			if(MIKA_type_count+1>=MIKA_cline_c) /* すべての練習文字を入力した場合は練習を終了 */
			{
				if(MIKA_practice_end_flag==0) /* タイマーによる割り込みを考慮して再度フラグをチェック */
				{
						MIKA_practice_end_flag=1; /* 練習実行中フラグを終了にセット */
						clearInterval(MIKA_Procrtimer);	 /* 制限時間60秒のタイマーをキャンセル */				
						MIKA_type_count++; /* 入力文字正解数を加算 */
						MIKA_utikiri_flag=1; /* 練習打ち切りフラグをセット */
						MIKA_utikiri_flag2=0; /* 前回練習速度消去用にフラグをクリア */
						if(MIKA_err_char_flag==1) /* 前回入力がエラーの場合 */
						{
							MIKA_err_char_flag=0; /* エラー入力フラグクリア */
							disperrchar(g,0); /* エラー文字の赤色表示を元の背景色に戻す */
						}
						cslputu(g,MIKA_t_line*16+MIKA_c_p2*20,MIKA_c_p1*16,"aa",1,MIKA_color_text_under_line); /* 正解文字に下線を表示 */
						if(MIKA_c_p1<(MIKA_kazu_yoko-1)) /* 次の練習文字位置を取得 */
						{
							MIKA_c_p1++; /* 横座標インクリメント */
						}
						else
						{
							MIKA_c_p1=0; /* 横座標をゼロに設定*/
							MIKA_c_p2++; /* 縦座標をインクリメント */
						}
						procdispspeed(g); /* 入力速度を表示 */
						MIKA_type_time_record[MIKA_type_kind_no]=MIKA_type_time_record[MIKA_type_kind_no]+roundtime(MIKA_ttype_speed_time); /* 累積練習時間の記録を加算 */
						prockiroku(g); /* 記録を更新時の処理 */
						proctrainexit(g); /* 練習終了時の表示更新 */
				}
				return;
			}
			MIKA_type_count++; /* 入力文字正解数を加算 */
			//			cslput(g,MIKA_t_line*16+MIKA_c_p2*20,MIKA_c_p1*16,"aa"); /* 正解文字に下線 */
			if(MIKA_time_start_flag==0) /* 最初の正解文字入力の場合 */
			{
				MIKA_type_start_time=getmillisecond(); /* 練習開始時間をミリ秒で取得取得 */
				MIKA_type_speed_time=0; /* 前回練習時間秒を0に設定 */
				MIKA_ttype_speed_time=0; /* 今回練習時間秒を0に設定 */
				MIKA_time_start_flag=1; /* 練習時間計測フラグセット */
				MIKA_Procrtimer = setInterval(Procrtimer,MIKA_random_time_interval,g); /* タイマーを一秒間隔でセット */
			}
			if(MIKA_err_char_flag==1) /* 前回入力がエラーの場合 */
			{
				MIKA_err_char_flag=0; /* エラー入力フラグクリア */
				disperrchar(g,0); /* エラー文字の赤色表示を元の背景色に戻す */
			}
			cslputu(g,MIKA_t_line*16+MIKA_c_p2*20,MIKA_c_p1*16,"aa",1,MIKA_color_text_under_line); /* 正解文字に下線 */
			if(MIKA_c_p1<(MIKA_kazu_yoko-1)) /* 次の練習文字位置を取得 */
			{
				MIKA_c_p1++; /* 横座標インクリメント */
			}
			else
			{
				MIKA_c_p1=0; /* 横座標をゼロに設定*/
				MIKA_c_p2++; /* 縦座標をインクリメント */
			}
		}
		else
		{
			MIKA_err_char_flag=1; /* エラー入力フラグセット */
			disperrchar(g,1); /* エラー文字を背景赤で表示 */
			disperror1(g,1); /* 前回のエラー回数表示をクリア */
			MIKA_type_err_count++; /* エラー入力文字数カウンターを加算 */
			disperror1(g,0); /* 今回エラー回数を表示 */
		}
	}
}
function uppertolower(nChar) /* 英大文字を英小文字に変換 */
{
	var char1='A';
	var char2='a';
	if('A'<=nChar&&nChar<='Z') nChar=String.fromCharCode(nChar.charCodeAt(0)-char1.charCodeAt(0)+char2.charCodeAt(0)); /* 英大文字の場合は小文字に変換 */
		return nChar;
}
function shuffle(a,b,count) /* 互換 */
{
	var i;
	var k,kk;
	k=randomint(count); /* 互換開始位置をランダムに選択 */
	kk=k+randomint(count-1)+1; /* 互換終了位置をランダムに選択 */
	kk=kk%count;
	for(i=0;i<count;i++)
	{
		if(a[i]==0)
		{
			b[i]=0;
			break;
		}
		if(i==k)
		{
			b[kk]=a[k];
		}
		else if(i==kk)
		{
			b[k]=a[kk];
		}
		else
		b[i]=a[i];
	}
	return;
}
function shuffle_all(a,b,count) /* 互換を10回行う */
{
	var i;
	for(i=0;i<10;i++)
	{
		shuffle(a,b,count);
		shuffle(b,a,count);
	 }
	 return;
}
function inctable(h_pos,speed) /* ランダム練習 練習テキスト作成 */
{
	var	j,i,k,kk,l;
	var m,mm;
	var d,dd;
	var month_no;
	var point_flag;
	var date_count=7;
	var length;
	var size_yoko;
	var point_pos;
	var rsize_yoko;
	k=0;
	kk=0;
	size_yoko=36;
	rsize_yoko=36.0;
	MIKA_cline_x=Math.ceil((speed+rsize_yoko)/rsize_yoko); /* 最大練習行数算出 */
	if(MIKA_cline_x>10) MIKA_cline_x=10; /*最大練習行数は 10行 */
	if(MIKA_cline_x<3) MIKA_cline_x=3; /* 最小練習行数は 3行 */
	MIKA_cline_c=MIKA_cline_x*size_yoko; /* 最大文字数算出 */
	if(h_pos.charAt(0)=='.') /* ランダム練習(小数点有)の場合 */
	{
		point_flag=1;
		length=h_pos.length-1;
	}
	else if(h_pos.charAt(0)=='/') /* ランダム練習(日付)の場合 */
	{
		point_flag=2;
		length=h_pos.length-1;
	}
	else /* ランダム練習の場合 */
	{
		point_flag=0;
		length=h_pos.length;
	}
	if(point_flag==0) /* ランダム練習の場合 */
	{
		for(j=0;j<MIKA_cline_x;j++) /* 最大行まで文字を設定 */
		{
			for(i=0;i<size_yoko;i++) /* 一行分の文字設定 */
			{
				if(kk==5) /* 五文字目の場合 */
				{
					kk=0; /* 五文字をカウントするカウンターをゼロ設定 */
					MIKA_chat_t[j][i]=' '; /* スペース文字設定 */
				}
				else
				{
					k=randomint(length);; /* ランダムに文字列長以下の整数を取得 */
//					System.out.printf("乱数 =%d %d\n",k,length);
//					System.out.printf("i =%d j = %d\n",i,j);					
					MIKA_chat_t[j][i]=h_pos.charAt(k); /* 練習文字をランダムに設定 */
					kk++;
				}
			}
		}
	}
	else if(point_flag==1) /* ランダム練習(小数点有り)の場合 */
	{
		point_pos=randomint(3); /* 小数点位置をランダムに取得 */
/*		point_pos=1;	*/
		for(j=0;j<MIKA_cline_x;j++)  /* 最大行まで文字を設定 */
		{
			for(i=0;i<size_yoko;i++) /* 一行分の文字設定 */
			{
				if(kk==5) /* 五文字目の場合 */
				{
					kk=0; /* 五文字をカウントするカウンターをゼロ設定 */
					MIKA_chat_t[j][i]=' '; /* スペース文字設定 */
					point_pos=randomint(3); /* 小数点位置をランダムに取得 */
				}
				else
				{
					if(kk==point_pos+1) /* 小数点位置の場合 */
					{
						MIKA_chat_t[j][i]='.'; /* 小数点を設定 */
					}
					else
					{
						if((point_pos>0)&&kk==0) /* 小数点位置が二番目か三番目で第一文字の場合 */
						{
							k=randomint(length-1); /* ゼロを除外した文字位置を乱数で取得 */
							MIKA_chat_t[j][i]=h_pos.charAt(k+2); /* ゼロ以外の文字を設定 */
						}
/*						else if(kk==4)
						{
							k=randomint(length-1);
							MIKA_chat_t[i][j]=h_pos[k+2];
						}	*/
						else /* 小数点位置が一番目か第一文字以外の場合 */
						{
							k=randomint(length); /* 数値をランダムに取得 */
							MIKA_chat_t[j][i]=h_pos.charAt(k+1); /* 数値をランダムに設定 */
						}
					}
					kk++; /* 五文字をカウントするカウンターを一加算 */
				}
			}
		}
	}
	else /* ランダム練習(日付)の場合 */
	{
		for(j=0;j<MIKA_cline_x;j++) /* 最大行まで文字を設定 */
		{
			shuffle(MIKA_date_type,MIKA_date_type1,date_count); /* 日付の種類を一回互換する */
			shuffle_all(MIKA_date_type1,MIKA_date_type2,date_count); /* 日付の種類を互換する */
			for(i=0,l=0;l<date_count;l++) /* 日付の種類の回数分日付を設定する */
			{
				if(MIKA_date_type1[l]==0) break;
				if((MIKA_date_type1[l]==1)||(MIKA_date_type1[l]==2)) /* 月が一桁の場合 */
				{
					m=randomint(9); /* 1月から9月までをランダムに取得 */
					MIKA_chat_t[j][i]=h_pos.charAt(m+2); /* 月を設定 */
					month_no=m+1; /* 月の番号を設定 */
					i++;
				}
				else /* 月が二桁の場合 */
				{
					MIKA_chat_t[j][i]=h_pos.charAt(2); /* 月の第一文字に1を設定 */
					i++;
					mm=randomint(3); /* ランダムに 0,1,2を取得 */
					MIKA_chat_t[j][i]=h_pos.charAt(mm+1); /* 月の第二文字を設定 */
					month_no=10+mm; /* 月の番号を設定 */
					i++;
				}
				MIKA_chat_t[j][i]='/'; /* 日付の区切り記号 / を設定 */
				i++;
				if((MIKA_date_type1[l]==1)||(MIKA_date_type1[l]==3)) /* 日付が一桁の場合 */
				{
					d=randomint(9); /* 日付を1～9の間でランダムに選択 */
					MIKA_chat_t[j][i]=h_pos.charAt(d+2); /* 一桁の日付を設定 */
					i++;
				}
				else /* 日付が二桁の場合 */
				{
					d=MIKA_month_day[month_no-1]; /* 月ごとの最大日付を取得 */
					dd=randomint(d-9)+10; /* 二桁の日付をランダムに取得 */
					MIKA_chat_t[j][i]=h_pos.charAt(dd/10+1); /* 日付の一桁目を設定 */
					i++;
					MIKA_chat_t[j][i]=h_pos.charAt((dd%10)+1); /* 日付の二桁目を設定 */
					i++;
				}
				MIKA_chat_t[j][i]=' '; /* 区切りの空白文字を設定 */
				i++;
			}
		}	
	}
}
function getmillisecond() /* プログラム開始からの経過時間をミリセコンドで取得 */
{
	var millisecond;
	millisecond=Math.floor(performance.now());
	return(millisecond);
}	
function keycord(a) /* 練習文字に対応した キーの位置 列と行を取得 */
{
	var i,j;
	var pos1=[2];
	var xx_pos,yy_pos;
	xx_pos = 0;
	yy_pos= 0;
	for(j=0;j<4;j++)
	{
		i=cfind(a,MIKA_c_post[j]); /* 行ごとに一致する文字をサーチ */
		if(i!=0) /* 文字が一致する場合 */
		{
			xx_pos=j+1; /* 行の番号を設定 */
			yy_pos=i; /* 列の番号を設定 */
			break; 
		}
	}			
	pos1[0]=xx_pos;
	pos1[1]=yy_pos;
	return pos1;
}	
function randomchar(char_table0,char_position0) /* 前回と重複せずにランダムに文字位置を取得 */
// charposition =-1 初回の取得の場合
// charposition >=0 前回のランダム文字位置
	{
		var char_length,ii;
		char_length=char_table0.length; /* 文字テーブルの長さ取得 */
		if(char_length==0) return(0);
		if(char_position0==-1) /* 初回の乱数取得の場合 */
		{
			ii=randomint(char_length); /* 文字テーブルの長さを元に乱数を取得 */
			return(ii);
		}
		else /* 前回乱数取得の場合 */
		{
			ii=randomint(char_length-1); /* 文字テーブルの長さ－１を元に乱数を取得 */
			ii=ii+char_position0+1; /* 取得した乱数に前回の文字位置＋１を加算 */
			if(ii>=char_length) ii=ii-char_length; /* 文字位置が文字テーブル長を超えた場合の補正 */
			return(ii);	
		}
	}
function randomint(i) /* 整数 i より小さい乱数を生成 */
{
	var ii;
	if(i<=0) return(0);
	ii= Math.floor(Math.random() * i)
	return(ii);
}
function formatmes(x,i,flag,p) /* 数値を指定文字数の文字列に変換 */
// x 変換元の数値
// i 出力文字数
// flag 小数点以下の桁数
// p パディング文字
{
	var a;
	var j;
	a=x.toFixed(flag); /* 数値を固定小数点文字列に変換 */
	j=a.length;
	if(j>=i) return(a);
	else
	return a.padStart(i,p); /* 文字pでパディング*/
}
function formatf2(x,i) /* 実数を小数点以下2桁の文字列に変換してスペースでパディングする */
{
	return formatmes(x,i,2,' ');
}
function formatf1(x,i) /* 実数を小数点以下1桁の文字列に変換してスペースでパディングする */
{
	return formatmes(x,i,1,' ');
}
function formatd(x,i) /* 実数を小数点以下0桁の整数文字列に変換してスペースでパディングする */
{
	return formatmes(x,i,0,' ');
}
function formatzd(x,i) /* 実数を小数点以下0桁の整数文字列に変換してゼロでパディングする */
{
	return formatmes(x,i,0,'0');
}
function getdate() /* yy/mm/dd の書式で日付を取得 */
{
	var x,y,m,d;
	x=new Date(); /* 日付を取得 */
	y=x.getFullYear(); /* 年を取得 */
	y=y.toString(); /* 年を文字列に変換 */
	y=y.substring(2,4); /* 年の下二桁を取得 */
	m=x.getMonth()+1; /* 月を取得 */
	d=x.getDate(); /* 日を取得 */
	return y+'/'+formatzd(m,2)+'/'+formatzd(d,2); /* yy/mm/dd の形式に日付を変換 */
}
function seisekiruiseki() /* 個別の累積練習時間の合計を計算 */
{
	var i;
	var total;
	total=MIKA_p_time; /* ポジション練習の累積練習時間を加算 */
	for(i=0;i<3;i++)
	{
		total=total+MIKA_r_time[i]; /* ランダム練習の累積練習時間を加算 */
	}
	return total;
}	
function seisekiclear() /* 練習成績を消去 */
{
	var i;
	var date0='00/00/00'; 
	MIKA_rt_t=0; /* 合計累積練習時間をクリア */
	MIKA_p_time=0; /* ポジション練習の累積練習時間をクリア */
	for(i=0;i<3;i++) /* ランダム練習の成績をクリア */
	{
		MIKA_r_speed[i]=0.0; /* ランダム練習最高入力速度をクリア */
		MIKA_r_date[i]=date0; /* ランダム練習達成日付をクリア */
		MIKA_r_time[i]=0; /* ランダム練習累積練習時間をクリア */
	}	
	writecookier('',0,0,'',0); /* cookie 書き込み */
}
function writecookiep(time) /* ポジション練習累積練習時間をcookieに書き込み */
	{
		writecookier('P',0,0,'',time); /* cookie に全成績を書き込み */
	}
function writecookier(kind,ii,speed,date,time) /* cookie に指定された記録とともに全成績を書き込み */
{
	var cookie_data="MIKATEN=";
	var speed0;
	var date0;
	var time0;
	var i;
	if(kind=='P') /* 指定された記録がポジション練習の場合 */
	{
		time0=time;
	}
	else
	{
		time0=MIKA_p_time;
	}
	cookie_data=cookie_data+convcoded(time0,4); /* ポジション練習の累積練習時間を圧縮して作成 */
	for(i=0;i<3;i++) /* ランダム練習の練習記録の作成 */
	{
		if(kind=='R'&&i==ii) /* 指定された記録と一致した場合 */
		{
			speed0=speed;
			date0=date;
			time0=time;
		}
		else
		{
			speed0=MIKA_r_speed[i];
			date0=MIKA_r_date[i];
			time0=MIKA_r_time[i];
		}
		cookie_data=cookie_data+convcodef1(speed0,3)+convcodedate(date0,3)+convcoded(time0,4); /* 練習成績を圧縮して作成 */
	}	
	document.cookie=cookie_data+';expires='+cookiedate(); /* cookie を有効期限一年で書き込み */
}
function cookiedate() /* cookie の有効期限一年の作成 */
{
	var date1,date2;
	date1=new Date(); /* 当日の日付時刻を取得 */
	date1.setTime(date1.getTime()+365*24*60*60*1000); /* 一年先の時刻を計算 */
	date2=date1.toUTCString(); /* UTC標準時に変換 */
	return date2;
}
function readcookie() /* cookie を読み込みんで連想配列に格納 */
{
		var i;
		var cookie0;
		MIKA_cookie=document.cookie; /* cookie 読み込み */
		if(MIKA_cookie!='') /* cookie が空でない場合 */
		{
			MIKA_cookie_array0=MIKA_cookie.split('; '); /* cookie を各項目ごとに分離して配列に格納 */
			for(i=0;i<MIKA_cookie_array0.length;i++) 
			{
				cookie0=MIKA_cookie_array0[i]; /* cookieの配列の個別データを取得 */
				cookie1=cookie0.split('='); /* cookie の個別データーを '=' 文字で分離 */
				MIKA_cookie_array1[cookie1[0].trim()]=cookie1[1].trim(); /* cookie の各項目を連想配列に格納 */
			}	
		}

}
function convcodedate(a,i) /* 最高速度達成日の日付を圧縮 */
{
	var yy,mm,dd,b;
	var x;
	yy=a.substring(0,2); /* 日付の年を取得 */
	mm=a.substring(3,3+2); /* 日付の月を取得 */
	dd=a.substring(6,6+2); /* 日付の日を取得 */
	x=Number(yy)*32*13+Number(mm)*32+Number(dd); /* 年月日を日数に変換 */
	b=convcoded(x,i); /* 日数を圧縮して変換 */
	return(b);
}
function convcodef1(i,j) /* 小数点以下一桁の数値を圧縮 */
{
	var a;
	i=i.toFixed(1); /* 小数点以下一桁に四捨五入して文字列に変換 */
	i=Number(i);  /* 文字列を数値に変換 */
	i=i*10; /* 数値を10倍 */
	i=Math.round(i); /* 小数点以下を四捨五入 */
	a=convcoded(i,j); /* 数値を圧縮して変換 */
	return a;
}
function convcoded(i,j) /* 10進数を62進数に圧縮して変換 */
// i 10進数
// j 62進数の桁数
{
	var k,l,m;
	var a;
	k=MIKA_code.length; /* 62進数テーブルの文字列長を取得 */
	a=''; 
	i=Math.floor(i); /* 変換する数値を整数にする */
	for(l=0;l<j;l++)
	{	m=i%k; /* 各桁の数値を計算 */
		i=(i-m)/k;
		a=a+MIKA_code[m]; /* 対応する62進数文字を設定 */
	}
	return a;
}
function convcookie() /* cookie の連想配列データーを成績に変換して格納 */
{
	var time;
	var speed0,date0,time0;
	var i,ii;
	var a;
	if('MIKATEN' in MIKA_cookie_array1) /* 連想配列に 'MIKATEN'があった場合 */
	{
		a=MIKA_cookie_array1['MIKATEN']
		time0=a.substring(0,4); /* ポジション練習の累積練習時間の62進数値を取得 */
		MIKA_p_time=convdecoded(time0); /* 62進数を10進数に変換 */
		ii=4;
		for(i=0;i<3;i++) /* ランダム練習の成績を変換 */
		{
			speed0=a.substring(ii,ii+3); /* 最高入力速度を取得 */
			MIKA_r_speed[i]=convdecodef1(speed0); /* 最高入力速度を62進数から10進数に変換 */
			ii=ii+3;
			date0=a.substring(ii,ii+3); /* 達成日付を取得 */
			MIKA_r_date[i]=convdecodedate(date0); /* 達成日付を62進数から10進数に変換 */
			ii=ii+3;
			time0=a.substring(ii,ii+4); /* 累積練習時間を取得 */
			ii=ii+4;
			MIKA_r_time[i]=convdecoded(time0); /* 累積練習時間を62進数から10進数に変換 */
		}
	}
}
function convdecoded(a) /* 62進数文字列を10進数に変換 */
{
	var i,ii,j,k,l,m;
	var b;
	i=a.length; /* 62進数文字列の長さを取得 */
	ii=MIKA_code.length; /* 62進数テーブルの文字列長を取得 */
	j=0;
	m=1;
	for(k=0;k<i;k++)
	{
		b=a[k]; /* 62進数の一桁を取得 */
		l=cfind(b,MIKA_code); /* 62進数に対応する10進数を取得 */
		if(l>0) l=l-1;
		j=j+l*m; /* 62進数を10進数に変換 */
		m=m*ii;
	}
	return (j);
}
function convdecodef1(a) /* 62進数文字列を小数点以下一桁の実数に変換 */
{
	var b;
	b=convdecoded(a); /* 62進数文字列を10進数に変換 */
	b=b/10.0; /* 整数を小数点以下一桁の実数に変換 */
	return(b);
}	
function convdecodedate(a) /* 62進数文字列を年月日に変換 */
{
	var yy,mm,dd;
	var b;
	var c;
	b=convdecoded(a);  /* 62進数文字列を10進数に変換 */
	dd=b%32; /* 日付を計算 */
	b=(b-dd)/32;
	mm=b%13; /* 月を計算 */
	yy=(b-mm)/13; /* 年を計算 */
	c=formatzd(yy,2)+'/'+formatzd(mm,2)+'/'+formatzd(dd,2); /* 年月日をYY/MM/DDの文字列に変換 */
	return(c);
}
function Procptimer(g) /* ポジション練習用タイマー */
{
	if(MIKA_practice_end_flag==0) /* 練習実行中の場合 */
	{
		MIKA_guide_char=MIKA_key_char; /* ガイドキー文字に練習文字を設定 */
		dikposit(g,MIKA_guide_char,0); /* ガイドキー文字のキー位置を表示 */
		difposit(g,MIKA_guide_char,0); /* ガイドキー文字の指位置を表示 */
	}
//				System.out.printf("Timer task\n");
}
function Procrtimer(g) /* ランダム練習 用タイマー */
{
	MIKA_sec_count++; /* 秒カウンターインクリメント */
	if(MIKA_sec_count>=MIKA_random_key_limit2) /* 制限時間を超過した場合 */
	{
		clearInterval(MIKA_Procrtimer);	 /* 制限時間60秒のタイマーをキャンセル */
		if(MIKA_practice_end_flag==0) /* 練習実行中の場合 */
		{
			MIKA_practice_end_flag=1; /* 練習実行中フラグを終了にセット */
			MIKA_ttype_speed_time=MIKA_random_key_limit2; /* 経過時間を制限時間に設定 */
			MIKA_type_end_time=MIKA_type_start_time+MIKA_random_key_limit2*1000; /* 現在時刻を開始時間+制限時間に設定 */
			procdispspeed(g); /* 入力速度を表示 */
			MIKA_type_time_record[MIKA_type_kind_no]=MIKA_type_time_record[MIKA_type_kind_no]+MIKA_ttype_speed_time; /* 累積練習時間加算 */
			prockiroku(g); /* 記録を更新時の処理 */
			proctrainexit(g); /* 練習終了時の表示更新 */
		}	
	}
	else
	{	
		if(MIKA_practice_end_flag==0) /* 練習実行中の場合 */
		{
			MIKA_type_end_time=MIKA_type_start_time+MIKA_sec_count*1000; /* 現在時刻を計算 */
			MIKA_ttype_speed_time=MIKA_sec_count; /* 経過秒を設定 */
			procdispspeed(g); /* 入力速度を表示 */
		}
	}
}
