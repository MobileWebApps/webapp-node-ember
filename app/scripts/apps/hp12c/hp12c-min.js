require('scripts/apps/hp12c/hp12c');

"use strict";
var H = App.Apps.hp12c.calculator = {};
H.type = "12c";
H.touch_display = false;
H.disp_theo_width = 700;
H.disp_theo_height = 438;
H.disp_key_offset_x = 44;
H.disp_key_offset_y = 151;
H.disp_key_width = 54;
H.disp_key_height = 50;
H.disp_key_dist_x = (606 - 44) / 9;
H.disp_key_dist_y = (364 - 151) / 3;
"use strict";
H.badnumber = function(a) {
	return (isNaN(a) || !isFinite(a))
};
H.binary_sgn = function(a) {
	return (a >= 0 ? 1 : -1)
};
H.cl5_round = function(c, a) {
	if (a > 11) {
		return c
	}
	var b = Math.pow(10, a);
	return Math.round(Math.abs(c) * b) / b * H.binary_sgn(c)
};
H.trim = function(a) {
	return a.replace(/^\s+|\s+$/g, "")
};
H.zeropad = function(a, b) {
	a = "" + a;
	while (a.length < b) {
		a = "0" + a
	}
	return a
};
H.i18n = function(b, a, d) {
	var f = b.indexOf(".");
	if (f == -1 && d) {
		b += ".";
		f = b.length - 1
	}
	if (f != -1 && a) {
		b = b.slice(0, f) + "," + b.slice(f + 1)
	}
	if (f == -1) {
		f = b.length
	}
	var c = a ? "." : ",";
	for ( var g = f - 3; g > 0 + ((b.charAt(0) == "-" || b.charAt(0) == " ") ? 1
			: 0); g -= 3) {
		b = b.slice(0, g) + c + b.slice(g)
	}
	return b
};
H.tzoffset = function(a) {
	return a.getTimezoneOffset() * 60000
};
H.date_check = function(c, d, b) {
	var a = 31;
	if (d == 4 || d == 6 || d == 9 || d == 11) {
		a = 30
	} else {
		if (d == 2) {
			a = 28;
			if ((c % 4) === 0 && (((c % 100) !== 0) || ((c % 400) === 0))) {
				a = 29
			}
		}
	}
	if (b <= 0 || b > a || c <= 0 || c > 9999 || d <= 0 || d > 12) {
		return 0
	}
	return 1
};
H.date_interpret = function(f, c) {
	f = Math.round(Math.abs(f) * 1000000);
	var a = Math.round(f / 1000000) % 100;
	var e = Math.round(f / 10000) % 100;
	var d = Math.round(f % 10000);
	if (!c) {
		var b = a;
		a = e;
		e = b
	}
	if (!H.date_check(d, e, a)) {
		return null
	}
	return new Date(d, e - 1, a, 12, 0, 0)
};
H.date_diff = function(b, a) {
	return Math.round(((a.getTime() - H.tzoffset(a)) - (b.getTime() - H
			.tzoffset(b))) / 86400000)
};
H.date_add = function(a, b) {
	a.setTime(a.getTime() + Math.floor(b) * 86400000)
};
H.date_diff30 = function(h, f) {
	var c = h.getDate();
	var a = f.getDate();
	var g = c;
	var e = a;
	if (c == 31) {
		g = 30
	}
	if (a == 31) {
		if (c >= 30) {
			e = 30
		}
	}
	var d = 360 * h.getFullYear() + 30 * (h.getMonth() + 1) + g;
	var b = 360 * f.getFullYear() + 30 * (f.getMonth() + 1) + e;
	return b - d
};
H.date_gen = function(a, b) {
	if (b) {
		return a.getDate() + (a.getMonth() + 1) / 100 + a.getFullYear()
				/ 1000000
	} else {
		return (a.getMonth() + 1) + a.getDate() / 100 + a.getFullYear()
				/ 1000000
	}
};
H.date_to_show = function(a, b) {
	var c = a.getDay();
	if (c === 0) {
		c = 7
	}
	return H.date_gen(a, b).toFixed(6) + "  " + c
};
if (!window.console) {
	window.console = {}
}
if (!window.console.log) {
	window.console.log = function(a) {
	}
}
H.type_cookie = "hp12c";
if (H.type == "12c-platinum") {
	H.type_cookie = "hp12cpl"
} else {
	if (H.type == "11c") {
		H.type_cookie = "hp11c"
	}
}
H.INTERACTIVE = 0;
H.PROGRAMMING = 1;
H.RUNNING = 2;
H.RUNNING_STEP = 3;
H.FIN_N = 0;
H.FIN_I = 1;
H.FIN_PV = 2;
H.FIN_PMT = 3;
H.FIN_FV = 4;
H.STAT_N = 1;
H.STAT_X = 2;
H.STAT_X2 = 3;
H.STAT_Y = 4;
H.STAT_Y2 = 5;
H.STAT_XY = 6;
if (H.type == "11c") {
	H.STAT_N = 0;
	H.STAT_X = 1;
	H.STAT_X2 = 2;
	H.STAT_Y = 3;
	H.STAT_Y2 = 4;
	H.STAT_XY = 5
}
H.STAT_MIN = H.STAT_N;
H.STAT_MAX = H.STAT_XY;
H.TRIGO_DEG = 0;
H.TRIGO_RAD = 1;
H.TRIGO_GRAD = 2;
H.NOTATION_FIX = 0;
H.NOTATION_SCI = 1;
H.NOTATION_ENG = 2;
H.value_max = 9.999999 * Math.pow(10, 99);
H.value_min = Math.pow(10, -99);
H.ram_MAX = 100;
H.ram_ADDR_SIZE = 2;
H.STOP_INSTRUCTION = "43.33.00";
H.STOP_INSTRUCTION_IS_INVALID = false;
H.INSTRUCTION_SIZE = 2;
H.INSTRUCTION_MAX = 100;
if (H.type == "12c-platinum") {
	H.ram_MAX = 400;
	H.ram_ADDR_SIZE = 3;
	H.STOP_INSTRUCTION = "43.33.000"
} else {
	if (H.type == "11c") {
		H.ram_MAX = 203;
		H.ram_ADDR_SIZE = 3;
		H.STOP_INSTRUCTION = "50";
		H.STOP_INSTRUCTION_IS_INVALID = true
	}
}
H.MEM_MAX = 20;
if (H.type == "12c-platinum") {
	H.MEM_MAX = 30
}
H.ERROR_DIVZERO = 0;
H.ERROR_OVERFLOW = 1;
H.ERROR_STAT = 2;
H.ERROR_IP = 4;
H.ERROR_INDEX = 3;
H.ERROR_RTN = 5;
H.ERROR_FLAG = 6;
H.ERROR_IRR = 3;
H.ERROR_INTEREST = 5;
H.ERROR_MEMORY = 6;
H.ERROR_IRR2 = 7;
H.ERROR_DATE = 8;
"use strict";
function Hp12c_debug(a) {
	this.memwin = null;
	this.format_result = a
}
Hp12c_debug.prototype.show_memory2 = function() {
	if (!this.memwin || !this.memwin.document) {
		this.memwin = null;
		return

	}
	var d = this.memwin.document;
	var c = new Date();
	var g = d.getElementById("tt");
	var f;
	if (g) {
		g.innerHTML = H.type + " memory at " + c;
		if (H.type != "11c") {
			for (f = 0; f < H.machine.finmemory.length; ++f) {
				d.getElementById("finmemory" + f).innerHTML = this
						.format_result(H.machine.finmemory[f])
			}
		}
		for (f = 0; f < H.machine.stomemory.length; ++f) {
			d.getElementById("stomemory" + f).innerHTML = this
					.format_result(H.machine.stomemory[f])
		}
		if (H.type != "11c") {
			for (f = 0; f < H.machine.njmemory.length; ++f) {
				d.getElementById("njmemory" + f).innerHTML = this
						.format_result(H.machine.njmemory[f])
			}
		}
		d.getElementById("x").innerHTML = this.format_result(H.machine.x);
		d.getElementById("last_x").innerHTML = this
				.format_result(H.machine.last_x);
		d.getElementById("y").innerHTML = this.format_result(H.machine.y);
		d.getElementById("z").innerHTML = this.format_result(H.machine.z);
		d.getElementById("w").innerHTML = this.format_result(H.machine.w);
		for (f = 0; f < H.machine.ram.length; ++f) {
			d.getElementById("ram" + f).innerHTML = H.machine.ram[f]
		}
	}
	var b = this;
	window.setTimeout(function() {
		b.show_memory2()
	}, 1000)
};
Hp12c_debug.prototype.show_memory = function() {
	this.memwin = window.open(H.type_cookie + "_memory.html");
	var b = this;
	window.setTimeout(function() {
		b.show_memory2()
	}, 1000)
};
"use strict";
function Hp12c_dispatcher() {
}
var K = [];
var M = [];
var I;
Hp12c_dispatcher.prototype.functions = K;
Hp12c_dispatcher.prototype.modifier_sm = M;
Hp12c_dispatcher.prototype.KEY_RS = 31;
Hp12c_dispatcher.prototype.KEY_SST = 32;
Hp12c_dispatcher.prototype.KEY_RDOWN = 33;
H.FF = Hp12c_dispatcher.prototype.KEY_FF = 42;
H.GG = Hp12c_dispatcher.prototype.KEY_GG = 43;
H.STO = Hp12c_dispatcher.prototype.KEY_STO = 44;
H.RCL = Hp12c_dispatcher.prototype.KEY_RCL = 45;
Hp12c_dispatcher.prototype.KEY_DECIMAL = 48;
Hp12c_dispatcher.prototype.KEY_PLUS = 40;
Hp12c_dispatcher.prototype.KEY_MINUS = 30;
Hp12c_dispatcher.prototype.KEY_MULTIPLY = 20;
Hp12c_dispatcher.prototype.KEY_DIVIDE = 10;
Hp12c_dispatcher.prototype.KEY_BACKSPACE = 98;
H.STO2 = H.STO * 100 + 48;
H.RCL2 = H.RCL * 100 + 48;
H.RCL_GG = H.RCL * 100 + H.GG;
H.STO_PLUS = H.STO * 100 + 40;
H.STO_MINUS = H.STO * 100 + 30;
H.STO_TIMES = H.STO * 100 + 20;
H.STO_DIVIDE = H.STO * 100 + 10;
H.GTO = H.GG * 100 + 33;
H.GTO_MOVE = H.GTO * 100 + 48;
H.HYP = H.HYPINV = H.LBL = H.GSB = H.FIX = H.SCI = H.ENG = H.STO_F = 99999999;
Hp12c_dispatcher.init_vars = function() {
	var b = [ 11, 12, 13, 14, 15, 16, 7, 8, 9, 10, 21, 22, 23, 24, 25, 26, 4,
			5, 6, 20, 31, 32, 33, 34, 35, 36, 1, 2, 3, 30, 41, 42, 43, 44, 45,
			0, 48, 49, 40, 98 ];
	var a = [ H.FF, H.GG, H.STO, H.RCL, 48, 10, 20, 30, 40, 33 ];
	var c;
	for (c = 0; c < b.length; c++) {
		K[b[c]] = []
	}
	for (c = 0; c < a.length; c++) {
		M[a[c]] = []
	}
};
Hp12c_dispatcher.init_vars();
H.make_closure = function(c, a) {
	var b = function() {
		H.machine[c].apply(H.machine, a)
	};
	b.closure_type = "machine";
	b.closure_name = c;
	return b
};
H.make_pgrm_closure = function(c, a) {
	var b = function() {
		H.pgrm[c].call(H.pgrm, a)
	};
	b.closure_type = "pgrm";
	b.closure_name = c;
	return b
};
I = 11;
K[I][H.FF] = H.make_closure("amortization", []);
K[I][H.GG] = H.make_closure("ston_12x", []);
K[I][H.GG].dont_rst_do_fincalc = 1;
K[I][H.RCL] = H.make_closure("rclfin", [ 0 ]);
K[I][H.STO] = H.make_closure("stofin", [ 0 ]);
K[I][H.STO].dont_rst_do_fincalc = 1;
K[I][0] = H.make_closure("sto_or_calc_fin", [ 0 ]);
K[I][0].dont_rst_do_fincalc = 1;
I = 12;
K[I][H.FF] = H.make_closure("simple_interest", []);
K[I][H.GG] = H.make_closure("stoi_12div", []);
K[I][H.GG].dont_rst_do_fincalc = 1;
K[I][H.RCL] = H.make_closure("rclfin", [ 1 ]);
K[I][H.STO] = H.make_closure("stofin", [ 1 ]);
K[I][H.STO].dont_rst_do_fincalc = 1;
K[I][0] = H.make_closure("sto_or_calc_fin", [ 1 ]);
K[I][0].dont_rst_do_fincalc = 1;
I = 13;
K[I][H.FF] = H.make_closure("npv", []);
K[I][H.GG] = H.make_closure("stoCF0", []);
K[I][H.RCL] = H.make_closure("rclfin", [ 2 ]);
K[I][H.STO] = H.make_closure("stofin", [ 2 ]);
K[I][H.STO].dont_rst_do_fincalc = 1;
K[I][0] = H.make_closure("sto_or_calc_fin", [ 2 ]);
K[I][0].dont_rst_do_fincalc = 1;
I = 14;
K[I][H.FF] = H.make_closure("rnd", []);
K[I][H.GG] = H.make_closure("stoCFj", []);
K[I][H.RCL] = H.make_closure("rclfin", [ 3 ]);
K[I][H.RCL_GG] = H.make_closure("rclCFj", []);
K[I][H.STO] = H.make_closure("stofin", [ 3 ]);
K[I][H.STO].dont_rst_do_fincalc = 1;
K[I][0] = H.make_closure("sto_or_calc_fin", [ 3 ]);
K[I][0].dont_rst_do_fincalc = 1;
I = 15;
K[I][H.FF] = H.make_closure("irr", []);
K[I][H.GG] = H.make_closure("stoNj", []);
K[I][H.RCL_GG] = H.make_closure("rclNj", []);
K[I][H.RCL] = H.make_closure("rclfin", [ 4 ]);
K[I][H.STO] = H.make_closure("stofin", [ 4 ]);
K[I][H.STO].dont_rst_do_fincalc = 1;
K[I][0] = H.make_closure("sto_or_calc_fin", [ 4 ]);
K[I][0].dont_rst_do_fincalc = 1;
I = 16;
if (H.type == "12c-platinum") {
	K[I][H.FF] = H.make_closure("rpn_mode", [])
}
K[I][H.GG] = H.make_closure("date_date", []);
K[I][0] = H.make_closure("chs", []);
for (I = 0; I <= 9; ++I) {
	K[I][H.FF] = H.make_closure("set_decimals", [ I, 0 ]);
	K[I][H.RCL] = H.make_closure("rcl", [ I ]);
	K[I][H.RCL2] = H.make_closure("rcl", [ I + 10 ]);
	K[I][H.STO] = H.make_closure("sto", [ I ]);
	K[I][H.STO2] = H.make_closure("sto", [ I + 10 ]);
	K[I][H.STO_PLUS] = H.make_closure("stoinfix", [ I, H.STO_PLUS ]);
	K[I][H.STO_MINUS] = H.make_closure("stoinfix", [ I, H.STO_MINUS ]);
	K[I][H.STO_TIMES] = H.make_closure("stoinfix", [ I, H.STO_TIMES ]);
	K[I][H.STO_DIVIDE] = H.make_closure("stoinfix", [ I, H.STO_DIVIDE ]);
	K[I][H.GTO] = H.make_closure("gto_digit_add", [ I ]);
	K[I][H.GTO].dont_rst_modifier = 1;
	K[I][0] = H.make_closure("digit_add", [ I ])
}
I = 7;
K[I][H.GG] = H.make_closure("set_begin", [ 1 ]);
K[I][H.GG].dont_rst_do_fincalc = 1;
I = 8;
K[I][H.GG] = H.make_closure("set_begin", [ 0 ]);
K[I][H.GG].dont_rst_do_fincalc = 1;
I = 9;
K[I][H.GG] = H.make_closure("mem_info", []);
K[I][H.GG].no_pgrm = 1;
I = 10;
K[I][0] = H.make_closure("divide", []);
M[I][H.STO] = H.STO_DIVIDE;
I = 21;
K[I][H.FF] = H.make_closure("bond_price", []);
K[I][H.GG] = H.make_closure("sqroot", []);
K[I][0] = H.make_closure("poweryx", []);
I = 22;
K[I][H.FF] = H.make_closure("bond_yield", []);
K[I][H.GG] = H.make_closure("exp", []);
K[I][0] = H.make_closure("reciprocal", []);
I = 23;
K[I][H.FF] = H.make_closure("depreciation_sl", []);
K[I][H.GG] = H.make_closure("ln", []);
K[I][0] = H.make_closure("percentT", []);
I = 24;
K[I][H.FF] = H.make_closure("depreciation_soyd", []);
K[I][H.GG] = H.make_closure("frac", []);
K[I][0] = H.make_closure("deltapercent", []);
I = 25;
K[I][H.FF] = H.make_closure("depreciation_db", []);
K[I][H.GG] = H.make_closure("intg", []);
K[I][0] = H.make_closure("percent", []);
I = 26;
K[I][H.GG] = H.make_closure("date_dys", []);
K[I][H.STO] = H.make_closure("toggle_compoundf", []);
K[I][0] = H.make_closure("input_exponential", []);
if (H.type == "12c-platinum") {
	K[I][H.FF] = H.make_closure("algebraic_mode", [])
}
I = 4;
K[I][H.GG] = H.make_closure("set_dmy", [ 1 ]);
I = 5;
K[I][H.GG] = H.make_closure("set_dmy", [ 0 ]);
I = 6;
K[I][H.GG] = H.make_closure("stat_avgw", []);
I = 20;
if (H.type == "12c-platinum") {
	K[I][H.GG] = H.make_closure("square", [])
}
K[I][0] = H.make_closure("multiply", []);
M[I][H.STO] = H.STO_TIMES;
I = 31;
K[I][H.GG] = H.make_closure("pse", []);
K[I][H.FF] = H.make_closure("prog_pr", []);
K[I][0] = H.make_pgrm_closure("rs", []);
I = 32;
K[I][H.FF] = H.make_closure("clear_statistics", []);
K[I][H.GG] = H.make_pgrm_closure("bst", []);
K[I][0] = H.make_pgrm_closure("sst", []);
I = 33;
K[I][H.FF] = H.make_closure("clear_prog", [ 0 ]);
K[I][0] = H.make_closure("r_down", []);
M[I][H.GG] = H.GTO;
I = 34;
K[I][H.FF] = H.make_closure("clear_fin", []);
K[I][H.GG] = H.make_closure("test_x_le_y", []);
K[I][0] = H.make_closure("x_exchange_y", []);
I = 35;
K[I][H.FF] = H.make_closure("clear_reg", []);
K[I][H.GG] = H.make_closure("test_x_eq0", []);
K[I][0] = H.make_closure("clx", []);
I = 36;
K[I][H.FF] = H.make_closure("clear_prefix", []);
if (H.type == "12c-platinum") {
	K[I][H.GG] = H.make_closure("enter", [ 1 ])
} else {
	K[I][H.GG] = H.make_closure("lstx", [])
}
K[I][0] = H.make_closure("enter", [ 0 ]);
I = 1;
K[I][H.GG] = H.make_closure("stat_lr", [ 1 ]);
I = 2;
K[I][H.GG] = H.make_closure("stat_lr", [ 0 ]);
I = 3;
K[I][H.GG] = H.make_closure("fatorial", []);
I = 30;
K[I][0] = H.make_closure("minus", []);
M[I][H.STO] = H.STO_MINUS;
I = 41;
K[I][0] = H.make_closure("toggle_decimal_character", []);
K[I][0].no_pgrm = 1;
K[I][H.RCL] = H.make_closure("shv", []);
K[I][H.RCL].no_pgrm = 1;
K[I][H.STO] = H.make_closure("apocryphal", [ 1 ]);
K[I][H.STO].no_pgrm = 1;
I = 42;
M[I][0] = H.FF;
I = 43;
M[I][0] = H.GG;
M[I][H.RCL] = H.RCL_GG;
I = 44;
M[I][0] = H.STO;
I = 45;
M[I][0] = H.RCL;
I = 0;
K[I][H.GG] = H.make_closure("stat_avg", []);
I = 48;
K[I][H.FF] = H.make_closure("set_decimals_exponential", []);
K[I][H.GG] = H.make_closure("stat_stddev", []);
K[I][H.GTO] = H.make_closure("gto_buf_clear", []);
K[I][0] = H.make_closure("decimal_point_mode", []);
M[I][H.STO] = H.STO2;
M[I][H.RCL] = H.RCL2;
I = 49;
K[I][H.GG] = H.make_closure("stat_sigma_minus", []);
K[I][0] = H.make_closure("stat_sigma_plus", []);
I = 40;
if (H.type == "12c-platinum") {
	K[I][H.GG] = H.make_closure("lstx", [])
}
K[I][0] = H.make_closure("plus", []);
M[I][H.STO] = H.STO_PLUS;
I = 98;
K[I][0] = H.make_closure("digit_delete", []);
K[I][0].no_pgrm = 1;
Hp12c_dispatcher.prototype.handle_modifier = function(b, d) {
	var c = this.modifier_sm[b];
	if (c) {
		var a = c[H.machine.modifier];
		if (a) {
			H.machine.set_modifier(a);
			return true
		} else {
			if (c[0]) {
				H.machine.set_modifier(c[0]);
				return true
			}
		}
	}
	return false
};
Hp12c_dispatcher.prototype.find_function = function(a, c) {
	var d = this.functions[a];
	var b = null;
	if (d) {
		b = d[H.machine.modifier];
		if (!b) {
			b = d[0];
			if (b) {
				H.machine.rst_modifier(1)
			}
		}
	}
	if (c && b && b.no_pgrm) {
		b = null
	}
	return b
};
Hp12c_dispatcher.prototype.dispatch = function(a) {
	if (a == 99) {
		H.debug.show_memory();
		return

	}
	if (H.keyboard.enabled() && H.machine.error_in_display) {
		H.machine.reset_error();
		return

	} else {
		if (H.machine.program_mode == H.PROGRAMMING) {
			H.pgrm.type(a);
			return

		} else {
			if (H.machine.program_mode >= H.RUNNING) {
				H.pgrm.stop();
				return

			}
		}
	}
	this.dispatch_common(a)
};
Hp12c_dispatcher.prototype.dispatch_common = function(d) {
	var c = 1;
	if (this.handle_modifier(d, 0)) {
		return c
	}
	var e = this.find_function(d, 0);
	if (!e) {
		e = function() {
		};
		c = false
	}
	var b = 1;
	var a = 1;
	if (e.dont_rst_do_fincalc) {
		a = 0
	}
	if (e.dont_rst_modifier) {
		b = 0
	}
	e();
	if (b) {
		H.machine.rst_modifier(a)
	}
	return c
};
Hp12c_dispatcher.prototype.KEY_ISDIGIT = function(a) {
	return a >= 0 && a <= 9
};
M = undefined;
K = undefined;
I = undefined;
"use strict";
function Hp12c_display() {
	this.display_max = 9999999999;
	this.display_len = 10;
	this.display_min = 1e-10;
	this.lcd = [];
	var j = 1;
	var i = 2;
	var h = 4;
	var g = 8;
	var f = 16;
	var d = 32;
	var b = 64;
	var a = 128;
	var k = 256;
	this.lcdmap = [];
	this.lcdmap["0"] = j | i | h | f | d | b;
	this.lcdmap["1"] = h | d;
	this.lcdmap["2"] = j | h | g | f | b;
	this.lcdmap["3"] = j | h | g | d | b;
	this.lcdmap["4"] = i | h | g | d;
	this.lcdmap["5"] = j | i | g | d | b;
	this.lcdmap["6"] = j | i | g | f | d | b;
	this.lcdmap["7"] = j | h | d;
	this.lcdmap["8"] = j | i | h | g | f | d | b;
	this.lcdmap["9"] = j | i | h | g | d | b;
	this.lcdmap[" "] = 0;
	this.lcdmap["."] = a;
	this.lcdmap[","] = a | k;
	this.lcdmap.r = j | i;
	this.lcdmap.u = i | h | g;
	this.lcdmap.n = i | h | j;
	this.lcdmap.i = i;
	this.lcdmap.g = j | i | h | g | d | b;
	this.lcdmap["-"] = g;
	this.lcdmap.E = j | i | g | f | b;
	this.lcdmap.e = j | i | g | f | b;
	this.lcdmap.O = g | f | d | b;
	this.lcdmap.R = g | f;
	this.lcdmap.P = j | i | h | g | f;
	this.lcdmap[":"] = a;
	this.functionality_level = 0;
	if (!document) {
		return

	}
	if (!document.getElementById) {
		return

	}
	if (!document.getElementById("display")) {
		return

	}
	if (window.lcd_broken) {
		this.functionality_level = 1
	} else {
		this.functionality_level = 2
	}
	for ( var c = 0; c <= 10; ++c) {
		this.lcd[c] = [];
		this.lcd[c][0] = 0;
		this.lcd[c][this.lcd[c].length] = document.getElementById("lcd" + c
				+ "a");
		this.lcd[c][this.lcd[c].length] = document.getElementById("lcd" + c
				+ "b");
		this.lcd[c][this.lcd[c].length] = document.getElementById("lcd" + c
				+ "c");
		this.lcd[c][this.lcd[c].length] = document.getElementById("lcd" + c
				+ "d");
		this.lcd[c][this.lcd[c].length] = document.getElementById("lcd" + c
				+ "e");
		this.lcd[c][this.lcd[c].length] = document.getElementById("lcd" + c
				+ "f");
		this.lcd[c][this.lcd[c].length] = document.getElementById("lcd" + c
				+ "g");
		this.lcd[c][this.lcd[c].length] = document.getElementById("lcd" + c
				+ "p");
		this.lcd[c][this.lcd[c].length] = document.getElementById("lcd" + c
				+ "t")
	}
	this.display = document.getElementById("display");
	this.dbegin = document.getElementById("begin");
	this.ddmyc = document.getElementById("dmyc");
	this.dmodifier = document.getElementById("modifier");
	this.pgrm = document.getElementById("pgrm");
	this.rpnalg = document.getElementById("rpnalg");
	this.trigo = document.getElementById("trigo");
	this.user = document.getElementById("user");
	this.clear()
}
Hp12c_display.prototype.private_show_digit = function(g, i, h) {
	if (i >= this.lcd.length) {
		window.console.log("Too many characters for display");
		return

	}
	if (!this.lcdmap[g]) {
		g = " "
	}
	var d = this.lcdmap[g];
	var a = this.lcd[i];
	var c;
	var b = 1;
	for (c = 1; c < a.length; ++c) {
		a[c].style.visibility = (d & b) ? "visible"
				: ((h && a[c].style.visibility == "visible") ? "visible"
						: "hidden");
		b <<= 1
	}
};
Hp12c_display.prototype.private_lcd_display = function(a) {
	var b = -1;
	for ( var d = 0; d < a.length && b < this.lcd.length; ++d) {
		var c = a.charAt(d);
		++b;
		if (c == "." || c == ",") {
			--b;
			this.private_show_digit(c, b, 1)
		} else {
			this.private_show_digit(c, b, 0)
		}
	}
	for (++b; b < this.lcd.length; ++b) {
		this.private_show_digit(" ", b, 0)
	}
};
Hp12c_display.prototype.show = function(a) {
	if (this.functionality_level >= 2) {
		this.private_lcd_display(a)
	} else {
		if (this.functionality_level >= 1) {
			this.display.innerHTML = a
		}
	}
};
Hp12c_display.prototype.clear = function() {
	if (this.functionality_level >= 2) {
		for ( var b = 0; b < this.lcd.length; ++b) {
			for ( var a = 1; a < this.lcd[b].length; ++a) {
				this.lcd[b][a].style.visibility = "hidden"
			}
		}
	} else {
		if (this.functionality_level >= 1) {
			this.display.innerHTML = ""
		}
	}
};
Hp12c_display.prototype.format_result = function(c) {
	var l = "";
	var d = Math.abs(c);
	var j = H.machine.decimals;
	var i = H.machine.decimals;
	var p = H.machine.notation;
	var k = 0;
	var f;
	var b;
	if (c >= H.value_max) {
		k = 1;
		f = 99;
		c = H.value_max;
		d = Math.abs(c)
	} else {
		if (c <= -H.value_max) {
			k = 2;
			f = 99;
			c = -H.value_max;
			d = Math.abs(c)
		} else {
			if (d >= H.value_min) {
				f = Math.log(d) / Math.log(10);
				f = Math.floor(f + 1e-11)
			} else {
				k = 3;
				f = -100;
				d = c = 0
			}
		}
	}
	var o = H.machine.comma;
	if (p == H.NOTATION_FIX) {
		i = 6;
		if (d > this.display_max) {
			p = H.NOTATION_SCI
		} else {
			if (d !== 0 && f < -9) {
				p = H.NOTATION_SCI
			} else {
				if (d !== 0 && j < (-f)) {
					j = -f
				}
			}
		}
	}
	i = Math.min(i, 6);
	if (k != 3) {
		b = c / Math.pow(10, f)
	} else {
		b = 0
	}
	var q = b >= 0 ? 1 : -1;
	b = parseFloat(Math.abs(b).toFixed(i));
	if (p != H.NOTATION_FIX && b >= 10) {
		b /= 10;
		f += 1
	}
	b *= q;
	if (p == H.NOTATION_ENG && (!k)) {
		var g = 3 * Math.floor(f / 3);
		while (f > g) {
			b *= 10;
			f -= 1;
			if (i > 0) {
				i -= 1
			}
		}
	}
	if (p != H.NOTATION_FIX) {
		if (b === 0 && H.type != "11c" && false) {
			return H.i18n(" 0", o, 1)
		} else {
			if (k == 1) {
				return H.i18n(" 9.999999 99", o, 1)
			} else {
				if (k == 2) {
					return H.i18n("-9.999999 99", o, 1)
				}
			}
		}
		l = H.i18n(b.toFixed(i), o, 1);
		if (b >= 0) {
			l = " " + l
		}
		var a = this.display_len - 3 + 1 + 1;
		l = l.substr(0, a);
		while (l.length < a) {
			l = l + " "
		}
		if (b === 0) {
			f = 0
		}
		if (f < 0) {
			l = l + "-" + H.zeropad((-f).toFixed(0), 2)
		} else {
			l = l + " " + H.zeropad(f.toFixed(0), 2)
		}
		return l
	}
	var e = Math.max(0, j);
	var h = c < 0 ? "-" : " ";
	c = Math.abs(c);
	var m = c.toFixed(e).length - (e > 0 ? 1 : 0);
	if (m > this.display_len) {
		e -= (m - this.display_len);
		e = Math.max(0, e)
	}
	l = H.i18n(h + c.toFixed(e), o, 1);
	return l
};
Hp12c_display.prototype.displayNumber_now = function(b) {
	var c = H.machine.comma;
	if (isNaN(b)) {
		b = 0
	} else {
		if (b > H.value_max) {
			b = H.value_max
		} else {
			if (b < -H.value_max) {
				b = -H.value_max
			} else {
				if (Math.abs(b) < H.value_min) {
					b = 0
				}
			}
		}
	}
	var a = this.format_result(b);
	this.show(a)
};
Hp12c_display.prototype.displayNumber_endBlink = function(a) {
	H.machine.sti();
	this.displayNumber_now(a)
};
Hp12c_display.prototype.displayNumber = function(b) {
	H.machine.cli();
	this.show("");
	var c = this;
	window.setTimeout(function() {
		c.displayNumber_endBlink(b)
	}, 25)
};
Hp12c_display.prototype.displayTypedNumber = function(a, c, d, e, j, b) {
	var k = "";
	var h = H.machine.comma;
	if (b === 0) {
		if (c.length <= 0) {
			k = " 0"
		} else {
			k = (a < 0 ? "-" : " ") + c
		}
		if (H.type != "11c") {
			k += "."
		}
		k = H.i18n(k, h, 0)
	} else {
		if (b === 1) {
			k = H.i18n((a < 0 ? "-" : " ") + c + "." + d, h, 1)
		} else {
			if (b === 100) {
				var g = d.substr(0, 7 - c.length);
				k = H.i18n((a < 0 ? "-" : " ") + c + "." + g, h, 1);
				for ( var f = 0; f < (7 - g.length - c.length); ++f) {
					k += " "
				}
				k += j < 0 ? "-" : " ";
				k += H.zeropad(parseInt("0" + e, 10).toFixed(0), 2)
			}
		}
	}
	this.show(k)
};
Hp12c_display.prototype.show_modifier = function(b) {
	var a = "";
	var c = "";
	if (b == H.FF) {
		a = "f"
	} else {
		if (b == H.GG) {
			a = "g"
		} else {
			if (b == H.STO) {
				a = "STO"
			} else {
				if (b == H.STO2) {
					a = "STO★"
				} else {
					if (b == H.RCL) {
						a = "RCL"
					} else {
						if (b == H.RCL2) {
							a = "RCL★"
						} else {
							if (b == H.RCL_GG) {
								a = "RCL g"
							} else {
								if (b == H.STO_PLUS) {
									a = "STO+"
								} else {
									if (b == H.STO_MINUS) {
										a = "STO-"
									} else {
										if (b == H.STO_TIMES) {
											a = "STO×"
										} else {
											if (b == H.STO_DIVIDE) {
												a = "STO÷"
											} else {
												if (b == H.GTO) {
													a = "GTO"
												} else {
													if (b == H.GTO_MOVE) {
														a = "GTO★"
													} else {
														if (H.type != "11c") {
															a = ""
														} else {
															if (b == H.HYP) {
																a = "HYP"
															} else {
																if (b == H.HYPINV) {
																	a = "HYPINV"
																} else {
																	if (b == H.LBL) {
																		a = "f LBL"
																	} else {
																		if (b == H.GSB) {
																			a = "GSB"
																		} else {
																			if (b == H.FIX) {
																				a = "f FIX"
																			} else {
																				if (b == H.SCI) {
																					a = "f SCI"
																				} else {
																					if (b == H.ENG) {
																						a = "f ENG"
																					} else {
																						if (b == H.STO_FF) {
																							a = "STO f"
																						} else {
																							if (b == H.GG_SF) {
																								a = "g SF"
																							} else {
																								if (b == H.GG_CF) {
																									a = "g CF"
																								} else {
																									if (b == H.GG_FQUESTION) {
																										a = "g F?"
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if (this.functionality_level >= 1) {
		this.dmodifier.innerHTML = a
	}
};
Hp12c_display.prototype.show_begin = function(b) {
	var a = "";
	if (b) {
		a = "BEGIN"
	}
	if (this.dbegin && this.functionality_level >= 1) {
		this.dbegin.innerHTML = a
	}
};
Hp12c_display.prototype.show_error = function(a) {
	this.show("ERROR " + a)
};
Hp12c_display.prototype.display_meminfo = function(c, b) {
	--b;
	var a = (b % 10).toFixed(0);
	if (b >= 10) {
		a = ":" + a
	}
	this.show("P-" + H.zeropad(c, H.ram_ADDR_SIZE) + " R-" + a)
};
Hp12c_display.prototype.show_dmyc = function(b, c) {
	var a = "";
	if (b) {
		a += "D.MY"
	}
	if (c) {
		a += "&nbsp;&nbsp;C"
	}
	if (this.ddmyc && this.functionality_level >= 1) {
		this.ddmyc.innerHTML = a
	}
};
Hp12c_display.prototype.show_pgrm = function(d, c, b) {
	var a = "";
	if (d) {
		a = "PGRM"
	} else {
		if (c) {
			a = "RUN " + H.zeropad(b.toFixed(0), 2)
		}
	}
	if (this.functionality_level >= 1) {
		this.pgrm.innerHTML = a
	}
};
Hp12c_display.prototype.show_algmode = function(b) {
	if (this.rpnalg && H.type == "12c-platinum") {
		var a = [ "RPN", "ALG" ][b];
		if (this.functionality_level >= 1) {
			this.rpnalg.innerHTML = a
		}
	}
};
Hp12c_display.prototype.show_trigo = function(b) {
	if (H.type == "11c") {
		var a = [ "", "RAD", "GRAD" ][b];
		if (this.trigo && this.functionality_level >= 1) {
			this.trigo.innerHTML = a
		}
	}
};
Hp12c_display.prototype.show_user = function(b) {
	if (H.type == "11c") {
		var a = [ "", "USER" ][b];
		if (this.user && this.functionality_level >= 1) {
			this.user.innerHTML = a
		}
	}
};
"use strict";
function Hp12c_keyboard() {
	this.is_enabled = 0;
	this.kbdtable = {};
	this.kbdtable["0"] = 0;
	this.kbdtable["."] = 48;
	this.kbdtable[","] = 48;
	this.kbdtable["1"] = 1;
	this.kbdtable["2"] = 2;
	this.kbdtable["3"] = 3;
	this.kbdtable["4"] = 4;
	this.kbdtable["5"] = 5;
	this.kbdtable["6"] = 6;
	this.kbdtable["7"] = 7;
	this.kbdtable["8"] = 8;
	this.kbdtable["9"] = 9;
	this.kbdtable["+"] = 40;
	this.kbdtable["="] = 40;
	this.kbdtable["-"] = 30;
	this.kbdtable["*"] = 20;
	this.kbdtable.x = 20;
	this.kbdtable.X = 20;
	this.kbdtable["/"] = 10;
	this.kbdtable[":"] = 10;
	this.kbdtable["\r"] = 36;
	this.kbdtable["\n"] = 36;
	this.kbdtable[" "] = 36;
	this.kbdtable.h = 16;
	this.kbdtable.H = 16;
	this.kbdtable.f = 42;
	this.kbdtable.F = 42;
	this.kbdtable.g = 43;
	this.kbdtable.G = 43;
	this.kbdtable.s = 44;
	this.kbdtable.S = 44;
	this.kbdtable.r = 45;
	this.kbdtable.R = 45;
	this.kbdtable.o = 41;
	this.kbdtable.O = 41;
	this.kbdtable.w = 49;
	this.kbdtable.W = 49;
	this.kbdtable.y = 34;
	this.kbdtable.Y = 34;
	if (H.type == "12c" || H.type == "12c-platinum") {
		this.kbdtable.c = 35;
		this.kbdtable.C = 35;
		this.kbdtable.n = 11;
		this.kbdtable.N = 11;
		this.kbdtable.i = 12;
		this.kbdtable.I = 12;
		this.kbdtable.p = 13;
		this.kbdtable.P = 13;
		this.kbdtable.m = 14;
		this.kbdtable.M = 14;
		this.kbdtable.v = 15;
		this.kbdtable.V = 15;
		this.kbdtable["#"] = 23;
		this.kbdtable["$"] = 24;
		this.kbdtable["%"] = 25;
		this.kbdtable["!"] = 21;
		this.kbdtable["\\"] = 22;
		this.kbdtable.d = 33;
		this.kbdtable.D = 33;
		this.kbdtable[String.fromCharCode(40)] = 33;
		this.kbdtable["["] = 31;
		this.kbdtable["]"] = 32;
		this.kbdtable["?"] = 99;
		this.kbdtable[String.fromCharCode(8)] = 98;
		this.kbdtable.Z = 98;
		this.kbdtable.z = 98;
		this.kbdtable.e = 26;
		this.kbdtable.E = 26
	} else {
		if (H.type == "11c") {
			this.kbdtable.u = 32;
			this.kbdtable.U = 32;
			this.kbdtable.t = 22;
			this.kbdtable.T = 22;
			this.kbdtable.i = 23;
			this.kbdtable.I = 23;
			this.kbdtable.j = 24;
			this.kbdtable.J = 24;
			this.kbdtable.k = 25;
			this.kbdtable.K = 25;
			this.kbdtable.n = 33;
			this.kbdtable.N = 33;
			this.kbdtable[String.fromCharCode(40)] = 33;
			this.kbdtable.a = 11;
			this.kbdtable.A = 11;
			this.kbdtable.b = 12;
			this.kbdtable.B = 12;
			this.kbdtable.c = 13;
			this.kbdtable.C = 13;
			this.kbdtable.d = 14;
			this.kbdtable.D = 14;
			this.kbdtable.e = 15;
			this.kbdtable.E = 15;
			this.kbdtable.p = 26;
			this.kbdtable.P = 26;
			this.kbdtable["!"] = 14;
			this.kbdtable["\\"] = 15;
			this.kbdtable["["] = 31;
			this.kbdtable["]"] = 21;
			this.kbdtable["?"] = 99;
			this.kbdtable[String.fromCharCode(8)] = 35;
			this.kbdtable.Z = 35;
			this.kbdtable.z = 35
		}
	}
	this.browser = 1;
	if (document && document.getElementById) {
		this.pointer_div = document.getElementById("hp12c_div")
	} else {
		var b = {};
		var a = {};
		a.width = 700;
		a.height = 438;
		b.offsetLeft = 0;
		b.offsetTop = 0;
		b.style = a;
		this.pointer_div = b;
		this.browser = 0
	}
	this.kx = parseInt(this.pointer_div.style.width, 10) / H.disp_theo_width;
	this.ky = parseInt(this.pointer_div.style.height, 10) / H.disp_theo_height;
	this.xoff = H.disp_key_offset_x * this.kx;
	this.yoff = H.disp_key_offset_y * this.ky;
	this.xl = H.disp_key_width * this.kx;
	this.yl = H.disp_key_height * this.ky;
	this.xd = H.disp_key_dist_x * this.kx;
	this.yd = H.disp_key_dist_y * this.ky;
	this.enable();
	var c = this;
	if (this.browser) {
		if (H.touch_display) {
			document.getElementById("cross").ontouchstart = function(d) {
				c.mouse_click(d)
			}
		} else {
			document.getElementById("cross").onclick = function(d) {
				c.mouse_click(d)
			}
		}
		document.onkeypress = function(d) {
			c.hard_keyboard(d)
		}
	}
}
Hp12c_keyboard.prototype.enable = function() {
	this.is_enabled = 1
};
Hp12c_keyboard.prototype.disable = function() {
	this.is_enabled = 0
};
Hp12c_keyboard.prototype.enabled = function() {
	return this.is_enabled
};
Hp12c_keyboard.prototype.remap_key = function(b) {
	var c = b + 11;
	var a = (c % 10);
	if (a === 0) {
		c -= 10
	}
	var d = Math.floor(c / 10);
	if (c == 47) {
		c = 0
	} else {
		if (a >= 7 && a <= 9 && c != 48 && c != 49) {
			c = a - 3 * (d - 1)
		}
	}
	if (c == 46) {
		c = 36
	}
	return c
};
Hp12c_keyboard.prototype.hard_keyboard = function(c) {
	var f;
	var d;
	var b;
	if (window.event) {
		c = window.event;
		f = window.event.keyCode
	} else {
		if (c.which) {
			f = c.which
		} else {
			return true
		}
	}
	d = String.fromCharCode(f);
	var a = this.kbdtable[d];
	if (a !== undefined && a !== null) {
		H.dispatcher.dispatch(this.kbdtable[d]);
		c.returnValue = false;
		if (c.preventDefault) {
			c.preventDefault()
		}
		return false
	}
	return true
};
Hp12c_keyboard.prototype.mouse_click = function(b) {
	if (!b) {
		b = window.event
	}
	var d, c;
	if (H.touch_display) {
		b.preventDefault();
		d = (b.targetTouches[0].pageX - this.pointer_div.offsetLeft)
				- this.xoff;
		c = (b.targetTouches[0].pageY - this.pointer_div.offsetTop) - this.yoff
	} else {
		d = (b.offsetX ? b.offsetX : (b.pageX - this.pointer_div.offsetLeft))
				- this.xoff;
		c = (b.offsetY ? b.offsetY : (b.pageY - this.pointer_div.offsetTop))
				- this.yoff
	}
	if (d < 0 || c < 0 || d >= this.xd * 10 || c >= this.yd * 4) {
		return

	}
	var e = Math.floor(d / this.xd) + 10 * Math.floor(c / this.yd);
	while (d > this.xd) {
		d -= this.xd
	}
	while (c > this.yd) {
		c -= this.yd
	}
	var a = (d < this.xl) && ((c < this.yl) || e == 25);
	if (a) {
		H.dispatcher.dispatch(this.remap_key(e))
	}
};
"use strict";
function Hp12c_machine() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.w = 0;
	this.last_x = 0;
	this.alg_op = 0;
	this.stomemory = [];
	this.finmemory = [];
	this.njmemory = [];
	this.index = 0;
	this.ram = [];
	this.program_size = 1;
	this.flags = [ 0, 0 ];
	this.decimals = 2;
	this.comma = 0;
	this.begin = 0;
	this.dmy = 0;
	this.compoundf = 0;
	this.notation = H.NOTATION_FIX;
	this.trigo = H.TRIGO_DEG;
	this.user = 0;
	this.algmode = 0;
	this.program_mode = 0;
	this.ip = 0;
	this.pushed = 0;
	this.gtoxx = "";
	this.modifier = 0;
	this.do_fincalc = 0;
	this.xmode = -1;
	this.typed_mantissa = "";
	this.typed_decimals = "";
	this.typed_mantissa_signal = 1;
	this.typed_exponent = "00";
	this.typed_exponent_signal = 1;
	this.error_in_display = 0;
	this.call_stack = [];
	this.ALG_PLUS = 1;
	this.ALG_MINUS = 2;
	this.ALG_MULTIPLY = 3;
	this.ALG_DIVIDE = 4;
	this.ALG_POWER = 5;
	this.nvname = H.type_cookie;
	if (H.type == "11c") {
		this.nvN = [ "x", "y", "z", "w", "last_x", "decimals", "comma",
				"index", "trigo", "user", "notation" ];
		this.nvAN = [ "stomemory", "flags" ]
	} else {
		this.nvN = [ "x", "y", "z", "w", "last_x", "alg_op", "algmode",
				"decimals", "comma", "begin", "dmy", "compoundf", "notation" ];
		this.nvAN = [ "stomemory", "finmemory", "njmemory" ]
	}
	this.nvAX = [ "ram" ]
}
Hp12c_machine.prototype.program_limit = function() {
	if (H.type == "11c") {
		return Math.min(H.ram_MAX - 1, this.program_size - 1)
	}
	return H.ram_MAX - 1
};
Hp12c_machine.prototype.ram_available = function() {
	if (H.type == "11c") {
		return Math.min(H.ram_MAX - this.program_size)
	}
	return H.ram_MAX - 1
};
Hp12c_machine.prototype.incr_ip = function(a) {
	this.ip += a;
	if (this.ip < 0 || this.ip > this.program_limit()) {
		this.ip = 0
	}
};
Hp12c_machine.prototype.init = function() {
	this.clear_prog(1);
	this.clear_reg();
	this.clear_stack();
	this.error_in_display = 0
};
Hp12c_machine.prototype.clear_fin = function() {
	for ( var a = 0; a < 5; ++a) {
		this.finmemory[a] = 0
	}
	this.display_result()
};
Hp12c_machine.prototype.clear_statistics = function() {
	for ( var a = H.STAT_MIN; a <= H.STAT_MAX; ++a) {
		this.stomemory[a] = 0
	}
	this.x = this.y = this.z = this.w = 0;
	this.display_result()
};
Hp12c_machine.prototype.clear_prog = function(a) {
	if (a) {
		this.ram[0] = "";
		for ( var b = 1; b < H.ram_MAX; ++b) {
			this.ram[b] = H.STOP_INSTRUCTION
		}
		this.program_size = 1
	} else {
		this.display_result()
	}
	this.ip = 0
};
Hp12c_machine.prototype.clear_sto = function() {
	for ( var a = 0; a < H.MEM_MAX; ++a) {
		this.stomemory[a] = 0;
		this.njmemory[a] = 1
	}
};
Hp12c_machine.prototype.cli = function() {
	H.keyboard.disable()
};
Hp12c_machine.prototype.sti = function() {
	H.keyboard.enable()
};
Hp12c_machine.prototype.clear_typing = function() {
	this.xmode = -1;
	this.typed_mantissa = "";
	this.typed_decimals = "";
	this.typed_mantissa_signal = 1;
	this.typed_exponent = "00";
	this.typed_exponent_signal = 1
};
Hp12c_machine.prototype.display_result = function() {
	this.pushed = 0;
	this.clear_typing();
	H.display.displayNumber(this.x)
};
Hp12c_machine.prototype.display_all = function() {
	H.display.displayNumber(this.x);
	this.display_modifier();
	this.display_begin();
	this.display_dmyc();
	this.display_pgrm();
	this.display_algmode();
	this.display_trigo();
	this.display_user()
};
Hp12c_machine.prototype.pse2 = function() {
	this.sti();
	this.display_result()
};
Hp12c_machine.prototype.pse = function() {
	this.cli();
	var b = this;
	window.setTimeout(function() {
		b.pse2()
	}, 1000)
};
Hp12c_machine.prototype.toggle_decimal_character = function() {
	this.comma = this.comma ? 0 : 1;
	this.display_result();
	H.storage.save();
	console.log("Storage saved")
};
Hp12c_machine.prototype.display_result_date = function(a) {
	this.clear_typing();
	H.display.show(H.date_to_show(a, this.dmy))
};
Hp12c_machine.prototype.clear_stack = function() {
	this.last_x = this.x = this.y = this.z = this.w = 0
};
Hp12c_machine.prototype.clear_reg = function() {
	if (H.type !== "11c") {
		this.clear_stack()
	}
	this.alg_op = 0;
	this.index = 0;
	this.clear_fin();
	this.clear_sto();
	this.display_result()
};
Hp12c_machine.prototype.display_pgrm = function() {
	H.display.show_pgrm(this.program_mode == H.PROGRAMMING,
			this.program_mode >= H.RUNNING, this.ip)
};
Hp12c_machine.prototype.display_trigo = function() {
	H.display.show_trigo(this.trigo)
};
Hp12c_machine.prototype.display_user = function() {
	H.display.show_user(this.user)
};
Hp12c_machine.prototype.display_algmode = function() {
	H.display.show_algmode(this.algmode)
};
Hp12c_machine.prototype.display_error = function(a) {
	H.display.show_error(a);
	this.clear_typing();
	this.error_in_display = 1;
	if (this.program_mode >= H.RUNNING) {
		H.pgrm.stop()
	}
};
Hp12c_machine.prototype.reset_error = function() {
	this.error_in_display = 0;
	if (this.program_mode == H.INTERACTIVE) {
		this.display_result()
	} else {
		if (this.program_mode == H.PROGRAMMING) {
			this.display_program_opcode()
		}
	}
};
Hp12c_machine.prototype.display_modifier2 = function(a) {
	H.display.show_modifier(a)
};
Hp12c_machine.prototype.display_modifier = function() {
	this.display_modifier2(this.modifier)
};
Hp12c_machine.prototype.display_begin = function() {
	H.display.show_begin(this.begin)
};
Hp12c_machine.prototype.display_dmyc = function() {
	H.display.show_dmyc(this.dmy, this.compoundf)
};
Hp12c_machine.prototype.set_dmy = function(a) {
	this.dmy = a;
	this.display_dmyc();
	this.display_result()
};
Hp12c_machine.prototype.set_trigo = function(a) {
	this.trigo = a;
	this.display_trigo();
	this.display_result()
};
Hp12c_machine.prototype.rpn_mode = function() {
	this.algmode = 0;
	this.alg_op = 0;
	this.display_algmode();
	this.display_result()
};
Hp12c_machine.prototype.algebraic_mode = function() {
	this.algmode = 1;
	this.alg_op = 0;
	this.display_algmode();
	this.display_result()
};
Hp12c_machine.prototype.toggle_compoundf = function() {
	this.compoundf = this.compoundf ? 0 : 1;
	this.display_dmyc();
	this.display_result()
};
Hp12c_machine.prototype.toggle_user = function() {
	this.user = this.user ? 0 : 1;
	this.display_user();
	if (this.program_mode == H.INTERACTIVE) {
		this.display_result()
	}
};
Hp12c_machine.prototype.set_begin = function(a) {
	this.begin = a;
	this.display_begin();
	this.display_result()
};
Hp12c_machine.prototype.set_modifier = function(a) {
	this.modifier = a;
	if (a == H.GTO || a == H.GTO_MOVE) {
		this.gto_buf_clear()
	}
	this.display_modifier()
};
Hp12c_machine.prototype.set_decimals = function(b, a) {
	this.notation = a;
	this.decimals = b;
	this.display_result()
};
Hp12c_machine.prototype.set_decimals_exponential = function() {
	this.notation = H.NOTATION_SCI;
	this.decimals = 10;
	this.display_result()
};
Hp12c_machine.prototype.rst_modifier = function(a) {
	if (a) {
		this.do_fincalc = 0
	}
	this.modifier = 0;
	this.display_modifier()
};
Hp12c_machine.prototype.push = function() {
	this.w = this.z;
	this.z = this.y;
	this.y = this.x;
	this.pushed = 1
};
Hp12c_machine.prototype.digit_add = function(b) {
	var a;
	if (this.xmode == -1) {
		if (!this.pushed) {
			this.push()
		}
		this.clear_typing();
		this.typed_mantissa = "" + b;
		this.xmode = 0
	} else {
		if (this.xmode === 0) {
			if (this.typed_mantissa.length < H.display.display_len) {
				this.typed_mantissa += "" + b
			}
		} else {
			if (this.xmode == 1) {
				if ((this.typed_mantissa.length + this.typed_decimals.length) < H.display.display_len) {
					this.typed_decimals += "" + b
				}
			} else {
				if (this.xmode == 100) {
					this.typed_exponent = this.typed_exponent.substr(1, 1);
					this.typed_exponent += "" + b
				}
			}
		}
	}
	this.display_typing()
};
Hp12c_machine.prototype.display_typing = function() {
	this.x = this.typed_mantissa_signal
			* parseFloat(this.typed_mantissa + "." + this.typed_decimals + "0")
			* Math.pow(10, parseInt("0" + this.typed_exponent, 10)
					* this.typed_exponent_signal);
	H.display.displayTypedNumber(this.typed_mantissa_signal,
			this.typed_mantissa, this.typed_decimals, this.typed_exponent,
			this.typed_exponent_signal, this.xmode)
};
Hp12c_machine.prototype.digit_delete = function() {
	var a;
	var b;
	if (this.xmode == -1) {
		if (H.type == "11c") {
			this.x = 0;
			H.display.displayNumber(this.x)
		} else {
		}
		return

	}
	if (this.xmode === 0) {
		b = this.typed_mantissa.length - 1;
		if (b >= 0) {
			this.typed_mantissa = this.typed_mantissa.substr(0, b)
		}
	} else {
		if (this.xmode == 1) {
			b = this.typed_decimals.length - 1;
			if (b < 0) {
				this.xmode = 0
			} else {
				this.typed_decimals = this.typed_decimals.substr(0, b)
			}
		} else {
			if (this.xmode == 100) {
				this.typed_exponent = "";
				if (this.typed_decimals.length > 0) {
					this.xmode = 1
				} else {
					this.xmode = 0
				}
			}
		}
	}
	this.display_typing()
};
Hp12c_machine.prototype.input_exponential = function() {
	if (this.xmode == -1) {
		if (!this.pushed) {
			this.push()
		}
		this.clear_typing();
		this.typed_mantissa = "1"
	} else {
		if (this.xmode != 100) {
			if (this.typed_mantissa.length > (H.display.display_len - 3)) {
				return

			}
			if (parseInt("0" + this.typed_mantissa, 10) === 0) {
				this.typed_mantissa = "0";
				var c = parseInt("0" + this.typed_decimals, 10);
				if (c === 0) {
					this.typed_mantissa = "1"
				} else {
					var a = c.toFixed(0);
					var b = this.typed_decimals.length - ("" + a).length;
					b = Math.max(0, b);
					if ((this.typed_mantissa.length + b) >= (H.display.display_len - 3)) {
						return

					}
				}
			}
		}
	}
	this.xmode = 100;
	this.display_typing()
};
Hp12c_machine.prototype.decimal_point_mode = function() {
	if (this.xmode == -1) {
		if (!this.pushed) {
			this.push()
		}
		this.clear_typing()
	}
	if (this.typed_mantissa.length <= 0) {
		this.typed_mantissa = "0"
	}
	this.xmode = 1;
	this.display_typing()
};
Hp12c_machine.prototype.chs = function() {
	if (this.xmode == -1) {
		this.x = -this.x;
		this.display_result();
		return

	}
	if (this.xmode == 100) {
		this.typed_exponent_signal *= -1
	} else {
		this.typed_mantissa_signal *= -1
	}
	this.display_typing()
};
Hp12c_machine.prototype.pop = function() {
	this.x = this.y;
	this.y = this.z;
	this.z = this.w
};
Hp12c_machine.prototype.save_lastx = function() {
	if (!this.algmode) {
		this.last_x = this.x
	}
};
Hp12c_machine.prototype.lstx = function() {
	this.push();
	this.x = this.last_x;
	this.display_result()
};
Hp12c_machine.prototype.shv = function() {
	this.push();
	this.x = H.sve;
	this.display_result()
};
Hp12c_machine.prototype.apocryphal = function(a) {
	this.push();
	this.x = 140 + a;
	this.display_result()
};
Hp12c_machine.prototype.clear_prefix2 = function() {
	this.sti();
	this.display_result()
};
Hp12c_machine.prototype.clear_prefix = function() {
	var c = Math.abs(this.x);
	var a = Math.log(c) / Math.log(10);
	if (H.badnumber(a)) {
		a = 1
	}
	if (a == Math.floor(a)) {
		a += 0.1
	}
	c = c * Math.pow(10, H.display.display_len - Math.ceil(a));
	this.cli();
	H.display.show(H.zeropad(c.toFixed(0), H.display.display_len));
	var b = this;
	window.setTimeout(function() {
		b.clear_prefix2()
	}, 1000)
};
Hp12c_machine.prototype.x_exchange_y = function() {
	var a = this.x;
	this.x = this.y;
	this.y = a;
	this.display_result()
};
Hp12c_machine.prototype.fix_index = function() {
	var a = Math.floor(Math.abs(this.index));
	if (a >= H.MEM_MAX) {
		this.display_error(H.ERROR_INDEX);
		return null
	}
	return a
};
Hp12c_machine.prototype.x_exchange_index = function() {
	var a = this.fix_index();
	if (a === null) {
		return

	}
	var b = this.x;
	this.x = this.stomemory[a];
	this.stomemory[this.index] = b;
	this.display_result()
};
Hp12c_machine.prototype.x_exchange_index_itself = function() {
	var a = this.x;
	this.x = this.index;
	this.index = a;
	this.display_result()
};
Hp12c_machine.prototype.mem_info = function() {
	H.display.display_meminfo(this.ram_available(), this.stomemory.length);
	this.error_in_display = 1
};
Hp12c_machine.prototype.sf = function(a) {
	if (a >= this.flags.length) {
		this.display_error(H.ERROR_FLAG);
		return

	}
	this.flags[a] = 1
};
Hp12c_machine.prototype.cf = function(a) {
	if (a >= this.flags.length) {
		this.display_error(H.ERROR_FLAG);
		return

	}
	this.flags[a] = 0
};
Hp12c_machine.prototype.f_question = function(a) {
	if (a >= this.flags.length) {
		this.display_error(H.ERROR_FLAG);
		return

	}
	this.incr_ip(this.flags[a] ? 0 : 1);
	this.display_result()
};
Hp12c_machine.prototype.dissect_index = function() {
	var d = H.binary_sgn(this.index);
	var b = H.cl5_round(Math.abs(this.index), 5);
	var a = Math.floor(b) * d;
	b -= d * a;
	b *= 1000;
	var c = Math.floor(b + 0.001);
	b = Math.max(0, b - c);
	b *= 100;
	var e = Math.floor(b + 0.1);
	return [ a, c, e ]
};
Hp12c_machine.prototype.update_index = function(a, b, d) {
	var c = H.binary_sgn(a);
	a = Math.abs(a);
	this.index = c * (a + b / 1000 + d / 100000)
};
Hp12c_machine.prototype.f_isg = function() {
	var b = this.dissect_index();
	var a = b[0], c = b[1], d = b[2];
	a += (d === 0 ? 1 : d);
	this.incr_ip(a > c ? 1 : 0);
	this.update_index(a, c, d)
};
Hp12c_machine.prototype.f_dse = function() {
	var b = this.dissect_index();
	var a = b[0], c = b[1], d = b[2];
	a -= (d === 0 ? 1 : d);
	this.incr_ip(a <= c ? 1 : 0);
	this.update_index(a, c, d)
};
Hp12c_machine.prototype.r_down = function() {
	var a = this.x;
	this.x = this.y;
	this.y = this.z;
	this.z = this.w;
	this.w = a;
	this.display_result()
};
Hp12c_machine.prototype.r_up = function() {
	var a = this.x;
	this.x = this.w;
	this.w = this.z;
	this.z = this.y;
	this.y = a;
	this.display_result()
};
Hp12c_machine.prototype.clx = function() {
	this.x = 0;
	this.display_result();
	this.pushed = 1
};
Hp12c_machine.prototype.arithmetic = function(e, d, c) {
	this.save_lastx();
	this.pop();
	this.x = H.arithmetic_round(e, d, c);
	this.display_result()
};
Hp12c_machine.prototype.alg_resolve = function() {
	var b;
	var a = 1;
	if ((!this.algmode) || (this.alg_op <= 0)) {
		return a
	}
	if (this.alg_op == this.ALG_PLUS) {
		this.arithmetic(this.y + this.x, this.x, this.y)
	} else {
		if (this.alg_op == this.ALG_MINUS) {
			this.arithmetic(this.y - this.x, this.x, this.y)
		} else {
			if (this.alg_op == this.ALG_MULTIPLY) {
				this.arithmetic(this.y * this.x, 0, 0)
			} else {
				if (this.alg_op == this.ALG_DIVIDE) {
					b = this.y / this.x;
					if (H.badnumber(b)) {
						this.display_error(H.ERROR_DIVZERO);
						a = 0
					} else {
						this.arithmetic(b, 0, 0)
					}
				} else {
					if (this.alg_op == this.ALG_POWER) {
						b = Math.pow(this.y, this.x);
						if (H.badnumber(b)) {
							this.display_error(H.ERROR_DIVZERO);
							a = 0
						} else {
							this.arithmetic(b, 0, 0)
						}
					}
				}
			}
		}
	}
	this.alg_op = 0;
	return a
};
Hp12c_machine.prototype.enter = function(a) {
	if (this.algmode && this.alg_op) {
		this.alg_resolve()
	} else {
		if (!this.algmode || !a) {
			this.push();
			this.display_result();
			this.pushed = 1
		} else {
			this.display_result()
		}
	}
};
Hp12c_machine.prototype.plus = function() {
	if (this.algmode) {
		if (!this.alg_resolve()) {
			return

		}
		this.alg_op = this.ALG_PLUS;
		this.push();
		this.display_result()
	} else {
		this.arithmetic(this.y + this.x, this.x, this.y)
	}
};
Hp12c_machine.prototype.minus = function() {
	if (this.algmode) {
		if (!this.alg_resolve()) {
			return

		}
		this.alg_op = this.ALG_MINUS;
		this.push();
		this.display_result()
	} else {
		this.arithmetic(this.y - this.x, this.x, this.y)
	}
};
Hp12c_machine.prototype.multiply = function() {
	if (this.algmode) {
		if (!this.alg_resolve()) {
			return

		}
		this.alg_op = this.ALG_MULTIPLY;
		this.push();
		this.display_result()
	} else {
		this.arithmetic(this.y * this.x, 0, 0)
	}
};
Hp12c_machine.prototype.divide = function() {
	if (this.algmode) {
		if (!this.alg_resolve()) {
			return

		}
		this.alg_op = this.ALG_DIVIDE;
		this.push();
		this.display_result()
	} else {
		var a = this.y / this.x;
		if (H.badnumber(a)) {
			this.display_error(H.ERROR_DIVZERO)
		} else {
			this.arithmetic(a, 0, 0)
		}
	}
};
Hp12c_machine.prototype.poweryx = function() {
	if (this.algmode) {
		if (!this.alg_resolve()) {
			return

		}
		this.alg_op = this.ALG_POWER;
		this.push();
		this.display_result()
	} else {
		var a = Math.pow(this.y, this.x);
		if (H.badnumber(a)) {
			this.display_error(H.ERROR_DIVZERO)
		} else {
			this.arithmetic(a, 0, 0)
		}
	}
};
Hp12c_machine.prototype.power10 = function() {
	var a = Math.pow(10, this.x);
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.reciprocal = function() {
	var a = 1 / this.x;
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.square = function() {
	var a = Math.pow(this.x, 2);
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.sqroot = function() {
	var a = Math.pow(this.x, 0.5);
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.exp = function() {
	var a = Math.exp(this.x);
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.ln = function() {
	var a = Math.log(this.x);
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.log10 = function() {
	var a = Math.log(this.x) / Math.log(10);
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.trig = function(b) {
	var a = Math[b](H.radians(this.x, this.trigo));
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.triginv = function(b) {
	var a = Math[b](this.x);
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = H.to_angle_mode(a, this.trigo);
		this.display_result()
	}
};
Hp12c_machine.prototype.htrig = function(b) {
	var a = H[b].call(null, this.x);
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.htriginv = function(b) {
	var a = H[b].call(null, this.x);
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.intg = function() {
	this.save_lastx();
	this.x = Math.floor(Math.abs(this.x)) * H.binary_sgn(this.x);
	this.display_result()
};
Hp12c_machine.prototype.abs = function() {
	this.save_lastx();
	this.x = Math.abs(this.x);
	this.display_result()
};
Hp12c_machine.prototype.to_radians = function() {
	this.save_lastx();
	this.x = H.degrees_to_radians(this.x);
	this.display_result()
};
Hp12c_machine.prototype.to_degrees = function() {
	this.save_lastx();
	this.x = H.radians_to_degrees(this.x);
	this.display_result()
};
Hp12c_machine.prototype.to_hms = function() {
	this.save_lastx();
	this.x = H.hour_to_hms(this.x);
	this.display_result()
};
Hp12c_machine.prototype.to_hour = function() {
	this.save_lastx();
	this.x = H.hms_to_hour(this.x);
	this.display_result()
};
Hp12c_machine.prototype.pi = function() {
	this.push();
	this.x = Math.PI;
	this.display_result()
};
Hp12c_machine.prototype.random = function() {
	this.push();
	this.x = Math.random();
	this.display_result()
};
Hp12c_machine.prototype.random_sto = function() {
	this.display_result()
};
Hp12c_machine.prototype.rnd = function() {
	this.save_lastx();
	this.x = H.cl5_round(this.x, this.decimals);
	this.display_result()
};
Hp12c_machine.prototype.polar = function() {
	var a = H.polar(this.x, this.y);
	var b = a[0];
	var c = a[1];
	if (H.badnumber(b) || H.badnumber(c)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = b;
		this.y = H.to_angle_mode(c, this.trigo);
		this.display_result()
	}
};
Hp12c_machine.prototype.orthogonal = function() {
	var c = this.x;
	var d = H.radians(this.y, this.trigo);
	var b = H.orthogonal(c, d);
	var a = b[0];
	var e = b[1];
	if (H.badnumber(a) || H.badnumber(e)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.y = e;
		this.display_result()
	}
};
Hp12c_machine.prototype.fatorial = function() {
	if (H.type != "11c" && (this.x < 0 || this.x != Math.floor(this.x))) {
		this.display_error(H.ERROR_DIVZERO);
		return

	}
	if (this.x > 69.95) {
		this.save_lastx();
		this.x = H.value_max;
		this.display_result();
		return

	}
	var a;
	if (H.type === "11c") {
		a = H.fatorial_gamma(this.x)
	} else {
		a = H.fatorial(this.x)
	}
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO);
		return

	}
	this.save_lastx();
	this.x = a;
	this.display_result()
};
Hp12c_machine.prototype.frac = function() {
	this.save_lastx();
	this.x = (Math.abs(this.x) - Math.floor(Math.abs(this.x)))
			* H.binary_sgn(this.x);
	this.display_result()
};
Hp12c_machine.prototype.percent = function() {
	var a = this.y * this.x / 100;
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.percentT = function() {
	if (!this.alg_resolve()) {
		return

	}
	var a = 100 * this.x / this.y;
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.deltapercent = function() {
	if (!this.alg_resolve()) {
		return

	}
	var a = 100 * (this.x / this.y) - 100;
	if (H.badnumber(a)) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.sto = function(a) {
	this.stomemory[a] = this.x;
	this.display_result()
};
Hp12c_machine.prototype.sto_index = function(b) {
	var a = this.fix_index();
	if (a === null) {
		return

	}
	this.stomemory[a] = this.x;
	this.display_result()
};
Hp12c_machine.prototype.get_index = function() {
	this.push();
	this.x = this.index;
	this.display_result()
};
Hp12c_machine.prototype.set_index = function() {
	this.index = this.x;
	this.display_result()
};
Hp12c_machine.prototype.stoinfix = function(d, c) {
	var b = this.stomemory[d];
	if (c == H.STO_PLUS) {
		b += this.x
	} else {
		if (c == H.STO_MINUS) {
			b -= this.x
		} else {
			if (c == H.STO_TIMES) {
				b *= this.x
			} else {
				if (c == H.STO_DIVIDE) {
					b /= this.x;
					if (H.badnumber(b)) {
						this.display_error(H.ERROR_DIVZERO);
						return

					}
				}
			}
		}
	}
	if (Math.abs(b) > H.value_max) {
		this.display_error(H.ERROR_OVERFLOW);
		return

	}
	this.stomemory[d] = b;
	this.display_result()
};
Hp12c_machine.prototype.stoCF0 = function() {
	this.stomemory[0] = this.x;
	this.finmemory[H.FIN_N] = 0;
	this.display_result()
};
Hp12c_machine.prototype.stoCFj = function() {
	if (this.finmemory[H.FIN_N] != Math.floor(this.finmemory[H.FIN_N])
			|| this.finmemory[H.FIN_N] < 0
			|| this.finmemory[H.FIN_N] >= H.MEM_MAX) {
		this.display_error(H.ERROR_MEMORY)
	} else {
		this.finmemory[H.FIN_N]++;
		this.stomemory[this.finmemory[H.FIN_N]] = this.x;
		this.njmemory[this.finmemory[H.FIN_N]] = 1;
		this.display_result()
	}
};
Hp12c_machine.prototype.rclCFj = function() {
	if (this.finmemory[H.FIN_N] < 0 || this.finmemory[H.FIN_N] >= H.MEM_MAX
			|| Math.floor(this.finmemory[H.FIN_N]) != this.finmemory[H.FIN_N]) {
		this.display_error(H.ERROR_MEMORY)
	} else {
		this.push();
		this.x = this.stomemory[this.finmemory[H.FIN_N]];
		--this.finmemory[H.FIN_N];
		this.display_result()
	}
};
Hp12c_machine.prototype.rclNj = function() {
	if (this.finmemory[H.FIN_N] < 0 || this.finmemory[H.FIN_N] >= H.MEM_MAX
			|| Math.floor(this.finmemory[H.FIN_N]) != this.finmemory[H.FIN_N]) {
		this.display_error(H.ERROR_MEMORY)
	} else {
		this.push();
		this.x = this.njmemory[this.finmemory[H.FIN_N]];
		this.display_result()
	}
};
Hp12c_machine.prototype.stoNj = function() {
	if (this.finmemory[H.FIN_N] != Math.floor(this.finmemory[H.FIN_N])
			|| this.finmemory[H.FIN_N] < 0
			|| this.finmemory[H.FIN_N] >= H.MEM_MAX
			|| this.x != Math.floor(this.x) || this.x <= 0) {
		this.display_error(H.ERROR_MEMORY)
	} else {
		this.njmemory[this.finmemory[H.FIN_N]] = this.x;
		this.display_result()
	}
};
Hp12c_machine.prototype.stofin = function(a) {
	this.finmemory[a] = this.x;
	this.display_result();
	this.pushed = 1
};
Hp12c_machine.prototype.ston_12x = function() {
	var a = this.x * 12;
	if (Math.abs(a) > H.value_max) {
		this.display_error(H.ERROR_OVERFLOW);
		return

	}
	this.x = a;
	this.stofin(0)
};
Hp12c_machine.prototype.stoi_12div = function() {
	this.x /= 12;
	this.stofin(1)
};
Hp12c_machine.prototype.rcl = function(a) {
	this.push();
	this.x = this.stomemory[a];
	this.display_result()
};
Hp12c_machine.prototype.rcl_index = function(b) {
	var a = this.fix_index();
	if (a === null) {
		return

	}
	this.push();
	this.x = this.stomemory[a];
	this.display_result()
};
Hp12c_machine.prototype.rclfin = function(a) {
	this.push();
	this.x = this.finmemory[a];
	this.display_result()
};
Hp12c_machine.prototype.stat_sigma_rcl = function() {
	this.push();
	this.push();
	this.x = this.stomemory[H.STAT_X];
	this.y = this.stomemory[H.STAT_Y];
	this.display_result()
};
Hp12c_machine.prototype.stat_sigma_plus = function() {
	if (!this.alg_resolve()) {
		return

	}
	H.stat_accumulate(+1, this.stomemory, this.x, this.y);
	this.save_lastx();
	this.x = this.stomemory[H.STAT_N];
	this.display_result();
	this.pushed = 1
};
Hp12c_machine.prototype.stat_sigma_minus = function() {
	if (!this.alg_resolve()) {
		return

	}
	H.stat_accumulate(-1, this.stomemory, this.x, this.y);
	this.save_lastx();
	this.x = this.stomemory[H.STAT_N];
	this.display_result();
	this.pushed = 1
};
Hp12c_machine.prototype.stat_avgw = function() {
	this.alg_op = 0;
	var a = H.stat_avgw(this.stomemory);
	if (!a[0]) {
		this.display_error(H.ERROR_STAT)
	} else {
		this.save_lastx();
		this.x = a[1];
		this.display_result()
	}
};
Hp12c_machine.prototype.stat_avg = function() {
	this.alg_op = 0;
	var a = H.stat_avg(this.stomemory);
	if (!a[0]) {
		this.display_error(H.ERROR_STAT)
	} else {
		this.save_lastx();
		this.push();
		this.x = a[1];
		this.y = a[2];
		this.display_result()
	}
};
Hp12c_machine.prototype.stat_stddev = function() {
	this.alg_op = 0;
	var a = H.stddev(this.stomemory);
	if (!a[0]) {
		this.display_error(H.ERROR_STAT);
		return

	}
	this.save_lastx();
	this.push();
	this.x = a[1];
	this.y = a[2];
	this.display_result()
};
Hp12c_machine.prototype.stat_lr = function(b) {
	this.alg_op = 0;
	var a = H.stat_kr(this.stomemory, b, this.x);
	if (!a[0]) {
		this.display_error(H.ERROR_STAT)
	} else {
		this.save_lastx();
		this.push();
		this.x = a[1];
		this.y = a[2];
		this.display_result()
	}
};
Hp12c_machine.prototype.stat_linearregression = function() {
	this.alg_op = 0;
	var a = H.linear_regression(this.stomemory);
	if (!a[0]) {
		this.display_error(H.ERROR_STAT)
	} else {
		this.save_lastx();
		this.push();
		this.push();
		this.x = a[1];
		this.y = a[2];
		this.display_result()
	}
};
Hp12c_machine.prototype.permutations = function() {
	if (this.x < 0 || this.x != Math.floor(this.x) || this.x > 80 || this.y < 0
			|| this.y != Math.floor(this.y) || this.y > 80 || this.y < this.x) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		var a = H.permutations(this.y, this.x);
		if (H.badnumber(a)) {
			this.display_error(H.ERROR_DIVZERO);
			return

		}
		this.pop();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.combinations = function() {
	if (this.x < 0 || this.x != Math.floor(this.x) || this.x > 80 || this.y < 0
			|| this.y != Math.floor(this.y) || this.y > 80 || this.y < this.x) {
		this.display_error(H.ERROR_DIVZERO)
	} else {
		this.save_lastx();
		var a = H.combinations(this.y, this.x);
		if (H.badnumber(a)) {
			this.display_error(H.ERROR_DIVZERO);
			return

		}
		this.pop();
		this.x = a;
		this.display_result()
	}
};
Hp12c_machine.prototype.simple_interest = function() {
	if (!this.alg_resolve()) {
		return

	}
	var c = this.finmemory[H.FIN_N];
	var a = this.finmemory[H.FIN_I] / 100;
	var b = this.finmemory[H.FIN_PV];
	this.push();
	this.push();
	this.push();
	this.x = c / 360 * -b * a;
	this.y = -b;
	this.z = c / 365 * -b * a;
	this.display_result()
};
Hp12c_machine.prototype.fincalc2 = function(b) {
	this.sti();
	var a = H.financecalc(b, this.begin, this.compoundf, this.finmemory);
	if (a == -1) {
		this.x = this.finmemory[b];
		this.display_result()
	} else {
		this.display_error(a)
	}
};
Hp12c_machine.prototype.sto_or_calc_fin = function(c) {
	if (!this.alg_resolve()) {
		return

	}
	if (!this.do_fincalc) {
		this.stofin(c);
		this.do_fincalc = 1
	} else {
		this.cli();
		H.display.show("running");
		var b = this;
		window.setTimeout(function() {
			b.fincalc2(c)
		}, 200)
	}
};
Hp12c_machine.prototype.npv = function() {
	this.alg_op = 0;
	this.x = H.npv(this.finmemory[H.FIN_N], this.finmemory[H.FIN_I],
			this.stomemory, this.njmemory);
	this.display_result()
};
Hp12c_machine.prototype.irr = function() {
	this.alg_op = 0;
	H.display.show("running");
	var a = H.irr_calc(this.finmemory[H.FIN_N], this.finmemory[H.FIN_I],
			this.stomemory, this.njmemory);
	var b = a[0];
	this.finmemory[H.FIN_I] = a[1];
	if (b != -1) {
		this.display_error(b)
	} else {
		this.push();
		this.x = this.finmemory[H.FIN_I];
		this.display_result()
	}
};
Hp12c_machine.prototype.date_date = function() {
	this.alg_op = 0;
	var a = H.date_interpret(this.y, this.dmy);
	if (a === null) {
		this.display_error(H.ERROR_DATE);
		return

	}
	this.save_lastx();
	H.date_add(a, this.x);
	this.pop();
	this.x = H.date_gen(a, this.dmy);
	this.display_result_date(a)
};
Hp12c_machine.prototype.date_dys = function() {
	this.alg_op = 0;
	var a = H.date_interpret(this.x, this.dmy);
	var b = H.date_interpret(this.y, this.dmy);
	if ((b === null) || (a === null)) {
		this.display_error(H.ERROR_DATE);
		return

	}
	this.save_lastx();
	this.x = H.date_diff(b, a);
	this.y = H.date_diff30(b, a);
	this.display_result()
};
Hp12c_machine.prototype.amortization = function() {
	this.alg_op = 0;
	var a = this.x;
	var c = this.finmemory[H.FIN_N];
	var f = this.finmemory[H.FIN_I] / 100;
	var j = H.cl5_round(this.finmemory[H.FIN_PV], this.decimals);
	this.finmemory[H.FIN_PV] = j;
	var e = H.cl5_round(this.finmemory[H.FIN_PMT], this.decimals);
	this.finmemory[H.FIN_PMT] = e;
	var g = H.amortization(a, c, f, j, e, this.decimals, this.begin);
	var d = g[0];
	var b = g[1];
	var h = g[2];
	this.push();
	this.push();
	this.x = b;
	this.y = h;
	this.z = a;
	this.finmemory[H.FIN_N] += a;
	this.finmemory[H.FIN_PV] += h;
	this.display_result()
};
Hp12c_machine.prototype.bond_price = function() {
	this.alg_op = 0;
	var d = this.finmemory[H.FIN_I];
	if (d <= -100) {
		this.display_error(H.ERROR_INTEREST);
		return

	}
	var a = this.finmemory[H.FIN_PMT];
	var e = H.date_interpret(this.y, this.dmy);
	if (e === null) {
		this.display_error(H.ERROR_DATE);
		return

	}
	var c = H.date_interpret(this.x, this.dmy);
	if (c === null) {
		this.display_error(H.ERROR_DATE);
		return

	}
	var b = H.bond_price(d, a, e, c);
	if (!b) {
		this.display_error(H.ERROR_INTEREST);
		return

	} else {
		if (b[0] >= 0) {
			this.display_error(b[0]);
			return

		}
	}
	this.push();
	this.push();
	this.finmemory[H.FIN_N] = this.x = b[1];
	this.y = b[2];
	this.display_result()
};
Hp12c_machine.prototype.bond_yield = function() {
	this.alg_op = 0;
	var a = this.finmemory[H.FIN_PMT];
	var g = H.date_interpret(this.y, this.dmy);
	var d = H.date_interpret(this.x, this.dmy);
	var f = this.finmemory[H.FIN_PV];
	var b = H.bond_yield(a, g, d, f);
	var e = b[0];
	var c = b[1];
	if (e >= 0) {
		this.display_error(e);
		return

	}
	this.push();
	this.finmemory[H.FIN_I] = this.x = c;
	this.display_result()
};
Hp12c_machine.prototype.depreciation_sl = function() {
	this.alg_op = 0;
	var h = this.finmemory[H.FIN_PV];
	var f = this.finmemory[H.FIN_FV];
	var e = this.finmemory[H.FIN_N];
	var c = this.x;
	var a = H.depreciation_sl(h, f, e, c);
	var d = a[0];
	var g = a[1];
	var b = a[2];
	if (d >= 0) {
		this.display_error(d);
		return

	}
	this.push();
	this.push();
	this.x = g;
	this.y = b;
	this.display_result()
};
Hp12c_machine.prototype.depreciation_soyd = function() {
	this.alg_op = 0;
	var h = this.finmemory[H.FIN_PV];
	var f = this.finmemory[H.FIN_FV];
	var e = this.finmemory[H.FIN_N];
	var c = this.x;
	var a = H.depreciation_soyd(h, f, e, c);
	var d = a[0];
	var g = a[1];
	var b = a[2];
	if (d >= 0) {
		this.display_error(d);
		return

	}
	this.push();
	this.push();
	this.x = g;
	this.y = b;
	this.display_result()
};
Hp12c_machine.prototype.depreciation_db = function() {
	this.alg_op = 0;
	var b = this.finmemory[H.FIN_PV];
	var e = this.finmemory[H.FIN_FV];
	var g = this.finmemory[H.FIN_N];
	var f = this.x;
	var i = this.finmemory[H.FIN_I] / 100;
	var d = H.depreciation_db(b, e, g, f, i);
	var c = d[0];
	var h = d[1];
	var a = d[2];
	if (c >= 0) {
		this.display_error(c);
		return

	}
	this.push();
	this.push();
	this.x = h;
	this.y = a;
	this.display_result()
};
Hp12c_machine.prototype.display_program_opcode = function() {
	var a = H.zeropad(this.ip.toFixed(0), H.ram_ADDR_SIZE) + "-"
			+ this.ram[this.ip];
	H.display.show(a)
};
Hp12c_machine.prototype.prog_pr = function() {
	if (this.program_mode == H.INTERACTIVE) {
		this.program_mode = H.PROGRAMMING;
		this.display_pgrm();
		this.display_program_opcode()
	}
};
Hp12c_machine.prototype.prog_bst_after = function() {
	this.sti();
	this.display_result()
};
Hp12c_machine.prototype.gto_digit_add = function(b) {
	this.gtoxx = "" + this.gtoxx + b.toFixed(0);
	if (this.gtoxx.length >= H.ram_ADDR_SIZE) {
		var a = parseInt(this.gtoxx, 10);
		this.gtoxx = "";
		this.rst_modifier();
		if (a > this.program_limit()) {
			this.display_error(H.ERROR_IP);
			return

		}
		this.ip = a
	}
};
Hp12c_machine.prototype.test_x_le_y = function() {
	this.display_result();
	this.incr_ip(this.x <= this.y ? 0 : 1)
};
Hp12c_machine.prototype.test_x_gt_y = function() {
	this.display_result();
	this.incr_ip(this.x > this.y ? 0 : 1)
};
Hp12c_machine.prototype.test_x_eq_y = function() {
	this.display_result();
	this.incr_ip(H.feq10(this.x, this.y) ? 0 : 1)
};
Hp12c_machine.prototype.test_x_ne_y = function() {
	this.display_result();
	this.incr_ip((!H.feq10(this.x, this.y)) ? 0 : 1)
};
Hp12c_machine.prototype.test_x_less_0 = function() {
	this.display_result();
	this.incr_ip(this.x < 0 ? 0 : 1)
};
Hp12c_machine.prototype.test_x_gt_0 = function() {
	this.display_result();
	this.incr_ip(this.x > 0 ? 0 : 1)
};
Hp12c_machine.prototype.test_x_le_0 = function() {
	this.display_result();
	this.incr_ip(this.x <= this.y ? 0 : 1)
};
Hp12c_machine.prototype.test_x_eq0 = function() {
	this.display_result();
	this.incr_ip(H.feq10(this.x, 0) ? 0 : 1)
};
Hp12c_machine.prototype.test_x_ne0 = function() {
	this.display_result();
	this.incr_ip((!H.feq10(this.x, 0)) ? 0 : 1)
};
Hp12c_machine.prototype.gto_buf_clear = function() {
	this.gtoxx = ""
};
Hp12c_machine.prototype.nop = function() {
};
"use strict";
H.INTERPOLATION_MAX = 50;
H.solve_infinity = function(a) {
	if (a > Math.pow(10, 95)) {
		a = Math.pow(10, 95)
	} else {
		if (a < -Math.pow(10, 95)) {
			a = -Math.pow(10, 95)
		}
	}
	return a
};
H.npv = function(c, h, g, b) {
	var l = g[0];
	var d = 0;
	for ( var k = 1; k <= c; ++k) {
		var a = g[k];
		for ( var j = 1; j <= b[k]; ++j) {
			++d;
			l += a / Math.pow(1 + (h / 100), d)
		}
	}
	return l
};
H.comppmtlim = function(a, b) {
	if (Math.abs(a) < 1e-8) {
		return b
	} else {
		return (1 - Math.pow(1 + (a / 100), -b)) / (a / 100)
	}
};
H.calcNPV = function(g, h, a, e, c, f, b, d) {
	if (h == Math.floor(h) || g) {
		return e + (1 + (a / 100) * (b ? 1 : 0)) * c * H.comppmtlim(a, h) + f
				* Math.pow(1 + (a / 100), -h)
	} else {
		if (!d) {
			return e * (1 + ((a / 100) * (h - Math.floor(h))))
					+ (1 + (a / 100) * (b ? 1 : 0)) * c
					* H.comppmtlim(a, Math.floor(h)) + f
					* Math.pow(1 + (a / 100), -Math.floor(h))
		} else {
			return e * Math.pow(1 + (a / 100), (h - Math.floor(h)))
					+ (1 + (a / 100) * (b ? 1 : 0)) * c
					* H.comppmtlim(a, Math.floor(h)) + f
					* Math.pow(1 + (a / 100), -Math.floor(h))
		}
	}
};
H.bond_previous_coupon = function(c, b) {
	var f = 0;
	var a = new Date(b);
	var e;
	while (a > c) {
		e = new Date(a);
		++f;
		a.setDate(1);
		a.setMonth(a.getMonth() - 6);
		var d = a.getMonth();
		a.setDate(b.getDate());
		if (a.getMonth() != d) {
			return null
		}
	}
	return [ a, e, f ]
};
H.bond_price = function(f, l, i, a) {
	var k;
	var c;
	var b = a;
	var d = H.date_diff(i, a);
	if (d <= 0) {
		return [ H.ERROR_DATE, 0, 0 ]
	}
	var n = H.bond_previous_coupon(i, a);
	if (n === null) {
		return [ H.ERROR_DATE, 0, 0 ]
	}
	var o = H.date_diff(n[0], n[1]);
	var j = H.date_diff(i, n[1]);
	var g = n[2];
	var h = o - j;
	if (d <= o) {
		k = (100 * (100 + l / 2)) / (100 + ((d / o) * f / 2))
	} else {
		k = 100 / Math.pow(1 + f / 200, g - 1 + j / o);
		for ( var m = 1; m <= g; ++m) {
			k += (l / 2) / Math.pow(1 + f / 200, m - 1 + j / o)
		}
	}
	c = (l / 2) * h / o;
	k -= c;
	if (H.badnumber(k) || H.badnumber(c)) {
		return [ H.ERROR_INTEREST, 0, 0 ]
	}
	return [ -1, k, c ]
};
H.irr_npvsum = function(d, c) {
	var a = Math.abs(c[0]);
	for ( var b = 1; b <= d; ++b) {
		a += Math.abs(c[b])
	}
	return a
};
H.irr_calc = function(f, j, h, b) {
	var m;
	var a;
	var o;
	var g;
	var e;
	var d = H.INTERPOLATION_MAX;
	var k = 1.25e-10;
	var c = H.irr_npvsum(f, h);
	if (c > 0) {
		k *= c
	}
	if (j <= -100 || j > 10000000000) {
		j = 0
	}
	g = j + 1;
	e = j;
	while (--d > 0) {
		j = g;
		m = H.npv(f, j, h, b);
		j = e;
		a = H.npv(f, j, h, b);
		if (j < -100 || j > 10000000000) {
			return [ H.ERROR_IRR, j ]
		}
		if (Math.abs(a) < k) {
			return [ -1, j ]
		}
		var l = (a - m) / (e - g);
		o = m - g * l;
		o /= -l;
		o = H.solve_infinity(o);
		g = e;
		e = o
	}
	return [ H.ERROR_IRR2, j ]
};
H.financecalc = function(m, f, n, o) {
	var g = 0;
	if (m === 0) {
		g = g || o[H.FIN_I] <= -100
	} else {
		if (m == 2) {
			g = g || o[H.FIN_I] <= -100
		} else {
			if (m == 3) {
				g = g || o[H.FIN_I] <= -100;
				g = g || o[H.FIN_N] === 0
			} else {
				if (m == 4) {
					g = g || o[H.FIN_I] <= -100
				}
			}
		}
	}
	if (g) {
		return H.ERROR_INTEREST
	}
	var j;
	var a;
	var k;
	var e;
	var d;
	var l = o[m];
	var c = H.INTERPOLATION_MAX;
	var h = 1.25e-10;
	var b = 0;
	if (m != H.FIN_PV) {
		b += Math.abs(o[H.FIN_PV])
	}
	if (m != H.FIN_PMT) {
		b += Math.abs(o[H.FIN_PMT])
	}
	if (m != H.FIN_N && m != H.FIN_PMT) {
		b += Math.abs(o[H.FIN_N] * o[H.FIN_PMT])
	}
	if (m != H.FIN_FV) {
		b += Math.abs(o[H.FIN_FV])
	}
	if (b > 0) {
		h *= b
	}
	if (m == H.FIN_N || m == H.FIN_I || b <= 0) {
		d = 1
	} else {
		d = b
	}
	k = 0;
	while (--c >= 0) {
		e = d;
		d = k;
		o[m] = e;
		if (o[H.FIN_I] <= -100) {
			break
		}
		j = H.calcNPV(m === 0, o[H.FIN_N], o[H.FIN_I], o[H.FIN_PV],
				o[H.FIN_PMT], o[H.FIN_FV], f, n);
		o[m] = d;
		if (o[H.FIN_I] <= -100) {
			break
		}
		a = H.calcNPV(m === 0, o[H.FIN_N], o[H.FIN_I], o[H.FIN_PV],
				o[H.FIN_PMT], o[H.FIN_FV], f, n);
		if (Math.abs(a) < h) {
			if (m === 0) {
				if ((d - Math.floor(d)) > 0.003) {
					o[m] = Math.floor(o[m]) + 1
				} else {
					o[m] = Math.floor(o[m])
				}
			}
			return -1
		}
		var i = (a - j) / (d - e);
		k = j - e * i;
		k /= -i;
		k = H.solve_infinity(k)
	}
	o[m] = l;
	return H.ERROR_INTEREST
};
H.bond_yield = function(j, g, a, i) {
	var c;
	if (g === null) {
		return [ H.ERROR_DATE, 0 ]
	}
	if (a === null) {
		return [ H.ERROR_DATE, 0 ]
	}
	if (i <= 0) {
		return [ H.ERROR_INTEREST, 0 ]
	}
	var m;
	var b;
	var n;
	var f;
	var e;
	var d = H.INTERPOLATION_MAX;
	var h = 1.25e-10 * Math.abs(i);
	f = 0;
	e = f + 1;
	while (--d > 0) {
		var l = H.bond_price(f, j, g, a);
		if (!l) {
			return [ H.ERROR_INTEREST, 0 ]
		} else {
			if (l[0] >= 0) {
				return [ l[0], 0 ]
			}
		}
		m = l[1] - i;
		l = H.bond_price(e, j, g, a);
		if (!l) {
			return [ H.ERROR_INTEREST, 0 ]
		} else {
			if (l[0] >= 0) {
				return [ l[0], 0 ]
			}
		}
		b = l[1] - i;
		if (f < -100 || f > 10000000000) {
			return [ H.ERROR_INTEREST, 0 ]
		}
		if (Math.abs(b) < h) {
			c = e;
			break
		}
		var k = (b - m) / (e - f);
		n = m - f * k;
		n /= -k;
		n = H.solve_infinity(n);
		f = e;
		e = n
	}
	return [ -1, c ]
};
H.depreciation_sl = function(f, d, c, b) {
	var e = 0;
	var a = f - d;
	if (b < 0 || b != Math.floor(b) || c <= 0 || c > Math.pow(10, 10)) {
		return [ H.ERROR_INTEREST, 0, 0 ]
	}
	if (b > c) {
		return [ -1, 0, 0 ]
	}
	while (--b >= 0) {
		e = (f - d) / c;
		if (H.badnumber(e)) {
			return [ H.ERROR_DIVZERO, 0, 0 ]
		}
		a -= e
	}
	return [ -1, e, a ]
};
H.depreciation_soyd = function(h, f, e, d) {
	var g = 0;
	var c = h - f;
	if (d < 0 || d != Math.floor(d) || e <= 0 || e > Math.pow(10, 10)) {
		return [ H.ERROR_INTEREST, 0, 0 ]
	}
	if (d > e) {
		return [ -1, 0, 0 ]
	}
	var b = 0;
	var a = e * (e + 1) / 2;
	while (--d >= 0) {
		g = (h - f) * (e - (++b) + 1) / a;
		if (H.badnumber(g)) {
			return [ H.ERROR_DIVZERO, 0, 0 ]
		}
		c -= g
	}
	return [ -1, g, c ]
};
H.depreciation_db = function(h, f, e, c, a) {
	var g = 0;
	var b = h - f;
	if (c < 0 || c != Math.floor(c) || e <= 0 || e > Math.pow(10, 10)) {
		return [ H.ERROR_INTEREST, 0, 0 ]
	}
	if (c > e || b < 0) {
		return [ -1, 0, 0 ]
	}
	var d = 0;
	while (--c >= 0) {
		if (++d < e) {
			g = (b + f) * a / e
		} else {
			g = b
		}
		if (H.badnumber(g)) {
			return [ H.ERROR_DIVZERO, 0, 0 ]
		}
		b -= g;
		if (b < 0) {
			g += b;
			b = 0
		}
	}
	return [ -1, g, b ]
};
H.amortization = function(a, f, h, n, g, d, c) {
	if (a <= 0 || a != Math.floor(a) || h <= -1) {
		return [ H.ERROR_INTEREST, 0, 0 ]
	}
	var b = 0;
	var l = 0;
	for ( var k = 1; k <= a; ++k) {
		var m = H.cl5_round(-n * h, d);
		if (k == 1 && c && f <= 0) {
			m = 0
		}
		var j = g - m;
		b += m;
		l += j;
		n += j
	}
	return [ -1, b, l ]
};
H.degrees_to_radians = function(a) {
	return a * Math.PI / 180
};
H.radians = function(b, a) {
	if (a == H.TRIGO_DEG) {
		b = H.degrees_to_radians(b)
	} else {
		if (a == H.TRIGO_GRAD) {
			b *= Math.PI / 200
		}
	}
	return b
};
H.radians_to_degrees = function(a) {
	return a * 180 / Math.PI
};
H.to_angle_mode = function(b, a) {
	if (a == H.TRIGO_DEG) {
		b = H.radians_to_degrees(b)
	} else {
		if (a == H.TRIGO_GRAD) {
			b *= 200 / Math.PI
		}
	}
	return b
};
H.hour_to_hms = function(a) {
	var f = H.binary_sgn(a);
	var b = Math.floor(Math.abs(a));
	var d = Math.abs(a) - b;
	d *= 60;
	var c = Math.floor(d + 1e-8);
	d = Math.max(d - c, 0);
	var e = d * 60;
	return f * (b + c / 100 + e / 10000)
};
H.hms_to_hour = function(a) {
	var f = H.binary_sgn(a);
	var b = Math.floor(Math.abs(a));
	var d = Math.abs(a) - b;
	d *= 100;
	var c = Math.floor(d + 1e-7);
	d = Math.max(d - c, 0);
	var e = d * 100;
	return f * (b + c / 60 + e / 3600)
};
H.asinh = function(a) {
	return Math.log(a + Math.sqrt(a * a + 1))
};
H.acosh = function(a) {
	return Math.log(a + Math.sqrt(a * a - 1))
};
H.atanh = function(a) {
	return 0.5 * Math.log((1 + a) / (1 - a))
};
H.sinh = function(a) {
	return (Math.exp(a) - Math.exp(-a)) / 2
};
H.cosh = function(a) {
	return (Math.exp(a) + Math.exp(-a)) / 2
};
H.tanh = function(a) {
	return (Math.exp(a) - Math.exp(-a)) / (Math.exp(a) + Math.exp(-a))
};
H.feq = function(d, c, e) {
	if (d === undefined || d === null || c === undefined || c === null
			|| H.badnumber(d) || H.badnumber(c)) {
		console.log("feq: bad number");
		return false
	}
	if (e === undefined || e === null) {
		e = Math.pow(10, -10)
	}
	return Math.abs(d - c) <= e
};
H.arithmetic_round = function(g, f, d) {
	if (g === 0) {
		return g
	} else {
		if (f === 0 && d === 0) {
			return g
		}
	}
	var i = Math.floor(Math.log(Math.abs(g)) / Math.log(10));
	var c = i;
	if (f !== 0) {
		c = Math.floor(Math.log(Math.abs(f)) / Math.log(10))
	}
	if (d !== 0) {
		c = Math.min(c, Math.floor(Math.log(Math.abs(f)) / Math.log(10)))
	}
	if (c < -88) {
		return g
	}
	var h = Math.pow(10, 11 - c);
	var e = Math.round(Math.abs(g) * h) / h * H.binary_sgn(g);
	return e
};
H.feq10 = function(e, d) {
	if (e === undefined || e === null || d === undefined || d === null
			|| H.badnumber(e) || H.badnumber(d)) {
		return false
	}
	var f = 0;
	if (e === 0 || d === 0) {
		f = Math.pow(10, -100)
	} else {
		var c = Math.floor(Math.max(Math.log(Math.abs(d)) / Math.log(10), Math
				.log(Math.abs(e))
				/ Math.log(10))) + 1;
		if (H.badnumber(c)) {
			f = Math.pow(10, -100)
		} else {
			f = Math.pow(10, c - 10)
		}
	}
	return H.feq(e, d, f)
};
H.feq10_0 = function(d, c) {
	var e = 0;
	if ((d <= 1 && d >= -1) || (c <= 1 && c >= -1)) {
		e = 2
	}
	return H.feq10(e + d, e + c)
};
H.polar = function(a, d) {
	var c = Math.atan2(d, a);
	var b = Math.sqrt(a * a + d * d);
	return [ b, c ]
};
H.orthogonal = function(a, b) {
	return [ a * Math.cos(b), a * Math.sin(b) ]
};
H.fatorial = function(b) {
	var a = 1;
	while (b > 1 && !H.badnumber(a)) {
		a *= b;
		--b
	}
	return a
};
H.gamma = function(d) {
	if (d < 0.5) {
		return Math.PI / (Math.sin(Math.PI * d) * H.gamma(1 - d))
	}
	d = d - 1;
	var a = H.gamma.p[0];
	for ( var c = 1; c < (H.gamma.g + 2); ++c) {
		a += H.gamma.p[c] / (d + c)
	}
	var b = d + H.gamma.g + 0.5;
	return Math.sqrt(2 * Math.PI) * Math.pow(b, (d + 0.5)) * Math.exp(-b) * a
};
H.gamma.g = 7;
H.gamma.p = [ 0.9999999999998099, 676.5203681218851, -1259.1392167224028,
		771.3234287776531, -176.6150291621406, 12.507343278686905,
		-0.13857109526572012, 0.000009984369578019572, 1.5056327351493116e-7 ];
H.fatorial_gamma = function(a) {
	if (a >= 0 && Math.floor(a) == a) {
		return H.fatorial(a)
	}
	return H.gamma(a + 1)
};
H.permutations = function(d, c) {
	return H.fatorial(d) / H.fatorial(d - c)
};
H.combinations = function(d, c) {
	return H.permutations(d, c) / H.fatorial(c)
};
H.stddev = function(b) {
	if (b[H.STAT_N] <= 1
			|| (b[H.STAT_N] * b[H.STAT_X2] - b[H.STAT_X] * b[H.STAT_X]) < 0
			|| (b[H.STAT_N] * b[H.STAT_Y2] - b[H.STAT_Y] * b[H.STAT_Y]) < 0) {
		return [ 0 ]
	}
	var a = Math.pow((b[H.STAT_N] * b[H.STAT_X2] - b[H.STAT_X] * b[H.STAT_X])
			/ (b[H.STAT_N] * (b[H.STAT_N] - 1)), 0.5);
	var c = Math.pow((b[H.STAT_N] * b[H.STAT_Y2] - b[H.STAT_Y] * b[H.STAT_Y])
			/ (b[H.STAT_N] * (b[H.STAT_N] - 1)), 0.5);
	return [ 1, a, c ]
};
H.linear_regression = function(d) {
	if (d[H.STAT_N] <= 1) {
		console.log("LR err type 1");
		return [ 0 ]
	}
	if (d[H.STAT_N] <= 1) {
		console.log("LR err type 2");
		return [ 0 ]
	}
	if (H.feq(d[H.STAT_X2] - d[H.STAT_X] * d[H.STAT_X] / d[H.STAT_N], 0)) {
		console.log("LR err type 3");
		return [ 0 ]
	}
	var c = d[H.STAT_X] / d[H.STAT_N];
	var b = d[H.STAT_Y] / d[H.STAT_N];
	var e = d[H.STAT_XY] - d[H.STAT_X] * d[H.STAT_Y] / d[H.STAT_N];
	e /= d[H.STAT_X2] - d[H.STAT_X] * d[H.STAT_X] / d[H.STAT_N];
	if (H.badnumber(e)) {
		console.log("LR err type 4");
		return [ 0 ]
	}
	var a = b - e * c;
	return [ 1, a, e ]
};
H.stat_kr = function(j, f, b) {
	var h = H.linear_regression(j);
	if (!h[0]) {
		console.log("statkr error 1");
		return [ 0 ]
	}
	var e = h[1];
	var d = h[2];
	if (f) {
		if (H.feq((j[H.STAT_N] * j[H.STAT_X2] - j[H.STAT_X] * j[H.STAT_X]), 0)) {
			console.log("statkr error 2");
			return [ 0 ]
		}
	} else {
		if (H.feq((j[H.STAT_N] * j[H.STAT_Y2] - j[H.STAT_Y] * j[H.STAT_Y]), 0)) {
			console.log("statkr error 3");
			return [ 0 ]
		}
	}
	var m = j[H.STAT_XY] - j[H.STAT_X] * j[H.STAT_Y] / j[H.STAT_N];
	var l = j[H.STAT_X2] - j[H.STAT_X] * j[H.STAT_X] / j[H.STAT_N];
	var k = j[H.STAT_Y2] - j[H.STAT_Y] * j[H.STAT_Y] / j[H.STAT_N];
	if (l === 0 || k === 0) {
		console.log("statkr error 5");
		return [ 0 ]
	}
	if ((l * k) < 0) {
		console.log("statkr error 6");
		return [ 0 ]
	}
	var g = Math.sqrt(l * k);
	if (H.badnumber(g) || g < 0) {
		console.log("statkr error 6");
		return [ 0 ]
	}
	var a = m / g;
	var i;
	if (f) {
		if (d === 0) {
			console.log("statkr error 7");
			return [ 0 ]
		}
		i = (b - e) / d
	} else {
		i = e + d * b
	}
	if (H.badnumber(i)) {
		console.log("statkr error 8");
		return [ 0 ]
	}
	return [ 1, i, a ]
};
H.stat_accumulate = function(c, b, a, d) {
	b[H.STAT_N] += c;
	b[H.STAT_X] += c * a;
	b[H.STAT_X2] += c * a * a;
	b[H.STAT_Y] += c * d;
	b[H.STAT_Y2] += c * d * d;
	b[H.STAT_XY] += c * a * d
};
H.stat_avg = function(b) {
	if (b[H.STAT_N] === 0) {
		return [ 0 ]
	}
	var a = b[H.STAT_X] / b[H.STAT_N];
	var c = b[H.STAT_Y] / b[H.STAT_N];
	return [ 1, a, c ]
};
H.stat_avgw = function(a) {
	if (a[H.STAT_X] === 0) {
		return [ 0 ]
	}
	return [ 1, a[H.STAT_XY] / a[H.STAT_X] ]
};
H.sve = 5.5;
H.kve = "5907012038a66e313b815a97cbacac3a";
"use strict";
function Hp12c_pgrm() {
	this.exec_special = [];
	this.exec_special[H.GTO] = [ 3, 1, this.p_exec_gto ];
	this.exec_special[H.dispatcher.KEY_RS] = [ 1, 0, this.p_exec_rs ];
	this.type_special = [];
	var a = this.type_special;
	a[H.FF * 100 + H.dispatcher.KEY_RS] = this.p_type_pr;
	a[H.dispatcher.KEY_SST] = this.p_type_sst;
	a[H.GG * 100 + H.dispatcher.KEY_SST] = this.p_type_bst;
	a[H.dispatcher.KEY_BACKSPACE] = this.p_type_bst;
	a[H.FF * 100 + H.dispatcher.KEY_RDOWN] = this.p_type_clear_pgrm;
	a[H.GTO * 100 + H.dispatcher.KEY_DECIMAL] = this.p_type_gto_move_begin;
	a[H.GG * 100 + H.dispatcher.KEY_RDOWN] = this.p_type_gto_begin;
	a[H.GG * 100 + 9] = this.p_type_mem_info;
	for ( var b = 0; b <= 9; ++b) {
		a[H.GTO_MOVE * 100 + b] = this.p_type_gto_move_n;
		a[H.GTO * 100 + b] = this.p_type_gto_n
	}
	this.execution_delay = 100
}
Hp12c_pgrm.p_encode_key = function(a, c) {
	var b;
	if (c) {
		b = H.zeropad(a.toFixed(0), H.ram_ADDR_SIZE)
	} else {
		b = H.zeropad(a.toFixed(0), H.INSTRUCTION_SIZE)
	}
	return b
};
Hp12c_pgrm.p_expand_opcode = function(b) {
	var c = [];
	if (b >= H.INSTRUCTION_MAX) {
		c = Hp12c_pgrm.p_expand_opcode(Math.floor(b / 100))
	}
	c.push(b % H.INSTRUCTION_MAX);
	return c
};
Hp12c_pgrm.p_encode_modifier = function(a) {
	if (a <= 0) {
		return ""
	}
	var d = "";
	var b = Hp12c_pgrm.p_expand_opcode(a);
	for ( var c = 0; c < b.length; ++c) {
		d += Hp12c_pgrm.p_encode_key(b[c], 0) + "."
	}
	return d
};
Hp12c_pgrm.p_encode_instruction = function(a, b, c) {
	return Hp12c_pgrm.p_encode_modifier(a) + Hp12c_pgrm.p_encode_key(b, c)
};
Hp12c_pgrm.prototype.p_poke = function(a, b, c) {
	if ((H.machine.ip + 1) >= H.ram_MAX) {
		H.machine.display_error(H.ERROR_IP);
		return

	}
	++H.machine.ip;
	H.machine.ram[H.machine.ip] = Hp12c_pgrm.p_encode_instruction(a, b, c)
};
Hp12c_pgrm.prototype.p_sched = function() {
	if (H.machine.program_mode >= H.RUNNING) {
		H.machine.display_pgrm();
		var b = this;
		window.setTimeout(function() {
			b.p_execute()
		}, this.execution_delay)
	}
};
Hp12c_pgrm.prototype.p_exec_gto = function(a) {
	H.machine.ip = a[2];
	H.machine.rst_modifier(1)
};
Hp12c_pgrm.prototype.p_exec_rs = function(a) {
	++H.machine.ip;
	this.stop();
	H.machine.rst_modifier(1)
};
Hp12c_pgrm.p_opcode_match = function(c, a, d) {
	a = Hp12c_pgrm.p_expand_opcode(a);
	for ( var b = 0; b < d; ++b) {
		if (c[b] != a[b]) {
			return false
		}
	}
	return true
};
Hp12c_pgrm.prototype.p_exec_handle_special = function(g) {
	var c = null;
	for ( var e in this.exec_special) {
		if (typeof e !== "object") {
			var b = this.exec_special[e][0];
			var a = this.exec_special[e][1];
			var d = this.exec_special[e][2];
			if (b != g.length) {
				continue
			}
			if (!Hp12c_pgrm.p_opcode_match(g, e, b - a)) {
				continue
			}
			c = d;
			break
		}
	}
	if (c) {
		c.call(this, g)
	}
	return !!c
};
Hp12c_pgrm.prototype.p_execute = function() {
	if (H.machine.program_mode < H.RUNNING) {
		return

	}
	if (!H.keyboard.enabled()) {
		this.p_sched();
		return

	}
	if (H.machine.ip <= 0) {
		H.machine.ip = 1;
		H.machine.display_pgrm()
	}
	var a = H.machine.ram[H.machine.ip];
	var c = a.split(".");
	var b;
	for (b = 0; b < c.length; ++b) {
		c[b] = parseInt(c[b], 10)
	}
	if (!this.p_exec_handle_special(c)) {
		for (b = 0; b < c.length; ++b) {
			if (!H.dispatcher.dispatch_common(c[b])) {
				window.console.log("Invalid opcode for exec: " + a)
			}
		}
		if (H.machine.program_mode >= H.RUNNING || !H.machine.error_in_display) {
			++H.machine.ip
		}
	}
	if (H.machine.ip > (H.ram_MAX - 1)) {
		H.machine.ip = 0
	}
	if (H.machine.ip <= 0) {
		this.stop()
	} else {
		if (H.machine.program_mode == H.RUNNING_STEP) {
			H.machine.program_mode = H.INTERACTIVE;
			H.machine.display_pgrm()
		} else {
			if (H.machine.program_mode == H.RUNNING) {
				this.p_sched()
			}
		}
	}
};
Hp12c_pgrm.prototype.p_run_step = function() {
	H.machine.program_mode = H.RUNNING_STEP;
	if (H.machine.ip <= 0) {
		H.machine.ip = 1
	}
	H.machine.display_pgrm();
	this.p_sched()
};
Hp12c_pgrm.prototype.p_run = function() {
	H.machine.program_mode = H.RUNNING;
	if (H.machine.ip <= 0) {
		H.machine.ip = 1
	}
	H.machine.display_pgrm();
	this.p_sched()
};
Hp12c_pgrm.prototype.rs = function() {
	if (H.machine.program_mode == H.INTERACTIVE) {
		H.machine.display_result();
		this.p_run()
	} else {
		this.stop()
	}
	H.machine.rst_modifier(1)
};
Hp12c_pgrm.prototype.p_type_pr = function(a) {
	H.machine.rst_modifier(1);
	H.machine.program_mode = H.INTERACTIVE;
	H.machine.ip = 0;
	H.machine.display_pgrm();
	H.machine.display_modifier();
	H.machine.display_result()
};
Hp12c_pgrm.prototype.p_type_mem_info = function(a) {
	H.machine.rst_modifier(1);
	H.machine.mem_info()
};
Hp12c_pgrm.prototype.p_type_sst = function(a) {
	if (++H.machine.ip >= H.ram_MAX) {
		H.machine.ip = 0
	}
	H.machine.rst_modifier(1);
	H.machine.display_program_opcode()
};
Hp12c_pgrm.prototype.p_type_bst = function(a) {
	if (--H.machine.ip < 0) {
		H.machine.ip = H.ram_MAX - 1
	}
	H.machine.rst_modifier(1);
	H.machine.display_program_opcode()
};
Hp12c_pgrm.prototype.p_type_clear_pgrm = function(a) {
	H.machine.clear_prog(1);
	H.machine.rst_modifier(1);
	H.machine.display_program_opcode()
};
Hp12c_pgrm.prototype.p_type_gto_move_n = function(a) {
	H.machine.gtoxx = "" + H.machine.gtoxx + a.toFixed(0);
	if (H.machine.gtoxx.length >= H.ram_ADDR_SIZE) {
		var b = parseInt(H.machine.gtoxx, 10);
		H.machine.gtoxx = "";
		H.machine.rst_modifier(1);
		if (b >= H.ram_MAX) {
			H.machine.display_error(H.ERROR_IP);
			return

		}
		H.machine.ip = b
	}
	H.machine.display_program_opcode()
};
Hp12c_pgrm.prototype.p_type_gto_n = function(a) {
	H.machine.gtoxx = "" + H.machine.gtoxx + a.toFixed(0);
	if (H.machine.gtoxx.length >= H.ram_ADDR_SIZE) {
		var b = parseInt(H.machine.gtoxx, 10);
		H.machine.gtoxx = "";
		H.machine.rst_modifier(1);
		if (b >= H.ram_MAX) {
			H.machine.display_error(H.ERROR_IP);
			return

		}
		this.p_poke(H.GTO, b, 1)
	}
	H.machine.display_program_opcode()
};
Hp12c_pgrm.prototype.p_type_gto_move_begin = function(a) {
	H.machine.set_modifier(H.GTO_MOVE, 1);
	H.machine.display_program_opcode()
};
Hp12c_pgrm.prototype.p_type_gto_begin = function(a) {
	H.machine.set_modifier(H.GTO, 1);
	H.machine.gtoxx = "";
	H.machine.display_program_opcode();
	return true
};
Hp12c_pgrm.prototype.p_type_handle_special = function(a) {
	var b = null;
	var c = H.machine.modifier * 100 + a;
	if (this.type_special[c]) {
		this.type_special[c].call(this, a);
		return true
	}
	return false
};
Hp12c_pgrm.prototype.type = function(a) {
	if (this.p_type_handle_special(a)) {
		return

	}
	if (!H.dispatcher.handle_modifier(a, 1)) {
		var b = H.dispatcher.find_function(a, 1);
		if (!b) {
			window.console.log("pgrm typing: no handler for " + a);
			H.machine.display_program_opcode();
			H.machine.rst_modifier(1);
			return

		}
		this.p_poke(H.machine.modifier, a, 0);
		H.machine.rst_modifier(1)
	}
	H.machine.display_program_opcode()
};
Hp12c_pgrm.prototype.stop = function() {
	H.machine.program_mode = H.INTERACTIVE;
	H.machine.display_pgrm();
	if (!H.machine.error_in_display) {
		H.machine.display_result()
	}
};
Hp12c_pgrm.prototype.sst = function() {
	if (H.machine.program_mode == H.INTERACTIVE) {
		this.p_run_step()
	}
	H.machine.rst_modifier(1)
};
Hp12c_pgrm.prototype.bst = function() {
	if (H.machine.ip > 0) {
		--H.machine.ip
	}
	H.machine.display_program_opcode();
	H.machine.cli();
	window.setTimeout(function() {
		H.machine.prog_bst_after()
	}, this.execution_delay);
	H.machine.rst_modifier(1)
};
"use strict";
function Hp12c_storage() {
}
Hp12c_storage.prototype.instruction_table = "0123456789_-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Hp12c_storage.prototype.addr_prefix = "$";
Hp12c_storage.prototype.compress_opcode = function(h) {
	var b = "";
	var a = h.split(".");
	for ( var f = 0; f < a.length; ++f) {
		var d = a[f];
		var c = d.length;
		var g = parseInt(d, 10);
		if (c == H.INSTRUCTION_SIZE && g >= 0 && g <= 50) {
			b += this.instruction_table.charAt(g)
		} else {
			if (c == H.ram_ADDR_SIZE) {
				b += this.addr_prefix;
				if (g < 64) {
					b += this.instruction_table.charAt(g)
				} else {
					b += this.instruction_table.charAt(Math.floor(g / 64));
					b += this.instruction_table.charAt(g % 64)
				}
			} else {
				return this.compress_opcode(H.STOP_INSTRUCTION)
			}
		}
	}
	return b
};
Hp12c_storage.prototype.decompress_opcode = function(d) {
	var f = "";
	var i = [];
	var b;
	var a;
	var c = 0;
	var g = 0;
	var j = 0;
	for ( var h = 0; h < d.length; ++h) {
		b = d.charAt(h);
		if (b == this.addr_prefix) {
			if ((i.length < 1) || (g > 0)) {
				c = 1;
				break
			}
			g = 1;
			continue
		}
		a = this.instruction_table.indexOf(b);
		if (a < 0) {
			c = 1;
			break
		}
		if (g) {
			j = (j * 64) + a;
			if (j >= Math.pow(10, H.ram_ADDR_SIZE)) {
				c = 1;
				break
			}
			if (j >= H.ram_MAX) {
				c = 1;
				break
			}
			if (g == 1) {
				i.push(H.zeropad(j, H.ram_ADDR_SIZE))
			} else {
				i[i.length - 1] = H.zeropad(j, H.ram_ADDR_SIZE)
			}
			g += 1
		} else {
			if (a > 49) {
				c = 1;
				break
			}
			i.push(H.zeropad(a, H.INSTRUCTION_SIZE))
		}
	}
	if (c) {
		f = H.STOP_INSTRUCTION
	} else {
		if (i.length > 3 || i.length < 1) {
			f = H.STOP_INSTRUCTION
		} else {
			f = i.join(".")
		}
	}
	return f
};
Hp12c_storage.prototype.marshal_array = function(b, e) {
	var c = "A" + e;
	for ( var d = 0; d < b.length; ++d) {
		var f = b[d];
		if (e == "X") {
			f = this.compress_opcode(f)
		}
		c += "!" + f
	}
	return c
};
Hp12c_storage.prototype.unmarshal_array = function(f, h, c) {
	if (c.length < 2) {
		return

	}
	var g = f[h];
	var e = c.charAt(1);
	c = c.slice(3);
	var b = c.split("!");
	for ( var d = 0; d < b.length && d < g.length; ++d) {
		if (e == "N") {
			g[d] = parseFloat(b[d]);
			if (H.badnumber(g[d])) {
				g[d] = 0
			}
		} else {
			if (d > 0) {
				g[d] = this.decompress_opcode(b[d])
			}
		}
	}
	return

};
Hp12c_storage.prototype.save_memory2 = function(d) {
	var a = new Date();
	a.setTime(a.getTime() + 7 * 24 * 60 * 60 * 1000);
	var e = d.nvname + "=";
	var c, b;
	for (c = 0; c < d.nvN.length; ++c) {
		b = d.nvN[c];
		e += b + ":" + d[b] + " "
	}
	for (c = 0; c < d.nvAN.length; ++c) {
		b = d.nvAN[c];
		e += b + ":" + this.marshal_array(d[b], "N") + " "
	}
	for (c = 0; c < d.nvAX.length; ++c) {
		b = d.nvAX[c];
		e += b + ":" + this.marshal_array(d[b], "X") + " "
	}
	e += "; expires=" + a.toGMTString() + "; path=/";
	return e
};
Hp12c_storage.prototype.save = function() {
	document.cookie = this.save_memory2(H.machine)
};
Hp12c_storage.prototype.recover_memory2 = function(h, j) {
	var c = j.split(";");
	for ( var d = 0; d < c.length; ++d) {
		var b = c[d].split("=");
		if (b.length != 2) {
			continue
		}
		b[0] = H.trim(b[0]);
		b[1] = H.trim(b[1]);
		if (b[0] != H.type_cookie) {
			continue
		}
		var i = b[1].split(" ");
		for ( var g = 0; g < i.length; ++g) {
			var a = i[g].split(":");
			if (a.length == 2 && h[a[0]] !== undefined) {
				if (a[1].length >= 2 && a[1].charAt(0) == "A") {
					this.unmarshal_array(h, a[0], a[1])
				} else {
					h[a[0]] = parseFloat(a[1]);
					if (H.badnumber(h[a[0]])) {
						h[a[0]] = 0
					}
				}
			}
		}
	}
	if (H.type != "11c") {
		return

	}
	H.machine.program_size = 1;
	for (g = 1; g < H.ram_MAX; ++g) {
		if (H.machine.ram[g] != H.STOP_INSTRUCTION) {
			H.machine.program_size += 1
		} else {
			break
		}
	}
};
Hp12c_storage.prototype.load = function() {
	this.recover_memory2(H.machine, document.cookie)
};
"use strict";
function Close_hp12c() {
	if (!Close_hp12c.done) {
		H.storage.save();
		Close_hp12c.done = 1
	}
}
Close_hp12c.done = 0;

H.init_hp12c = function() {
	H.display = new Hp12c_display();
	H.keyboard = new Hp12c_keyboard();
	H.debug = new Hp12c_debug(H.display.format_result);
	H.machine = new Hp12c_machine();
	H.dispatcher = new Hp12c_dispatcher();
	H.pgrm = new Hp12c_pgrm();
	H.storage = new Hp12c_storage();
	H.machine.init();
	H.storage.load();
	H.machine.display_all();
	H.machine.sti();
	window.onunload = Close_hp12c;
	window.beforenunload = Close_hp12c;
	document.onunload = Close_hp12c;
	document.beforeunload = Close_hp12c
};