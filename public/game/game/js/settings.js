var CANVAS_WIDTH = 1216;
var CANVAS_HEIGHT = 832;

var EDGEBOARD_X = 40;
var EDGEBOARD_Y = 172;

var FPS = 30;
var FPS_TIME = 1000 / FPS;
var DISABLE_SOUND_MOBILE = true;

var PRIMARY_FONT = "impactregular";
var SECONDARY_FONT = "ds-digitalbold";
var TERTIARY_FONT = "motorwerkregular";

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_BET_PANEL = 2;
var STATE_GAME = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END = 5;

var FICHE_WIDTH = 44;
var COLOR_FICHES = ["#ff7706", "#ffb600", "#000", "#06a800", "#d50000", "#444444"]
var CHIP_VALUES;
var BET_PANEL_X = 40;
var BET_PANEL_Y = 165;
var BET_PANEL_WIDTH;
var BET_PANEL_HEIGHT;
var HORSE_WIDTH = 326;
var HORSE_HEIGHT = 212;
var NUM_CHIPS;
var NUM_HORSES;
var MIN_BET;
var MAX_BET;
var WIN_OCCURRENCE;
var NUM_TRACK_BG = 397;
var ARRIVAL_X = 477;
var TIME_CHECK_RANK = 2000;
var HORSE_DATA = {
    "horse_names": ["engineer", "pin", "doughnut", "mayhem", "last things", "chatterbox", "hypno", "croquette"],
    "odd_win_bet": [3.7, 5.5, 2.2, 11.75, 17.25, 8.75, 7.15, 6.15],
    "odd_place_bet": [1.95, 2.55, 1.25, 5.5, 7.75, 3.05, 2.50, 2.05],
    "odd_show_bet": [1.25, 1.7, 1.09, 2.55, 4, 1.75, 1.55, 1.35],
    "forecast": []
};
var NUM_HOR = 0
var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
var SHOW_CREDITS;
var SOUNDTRACK_VOLUME_IN_GAME = 0;