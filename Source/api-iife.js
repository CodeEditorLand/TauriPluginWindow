if ("__TAURI__" in window) {
	var __TAURI_WINDOW__ = (function (e) {
		"use strict";
		var i = Object.defineProperty,
			n = (e, n) => {
				for (var t in n) i(e, t, { get: n[t], enumerable: !0 });
			},
			t = (e, i, n) => {
				if (!i.has(e)) throw TypeError("Cannot " + n);
			},
			l = (e, i, n) => (
				t(e, i, "read from private field"), n ? n.call(e) : i.get(e)
			),
			a = (e, i, n, l) => (
				t(e, i, "write to private field"),
				l ? l.call(e, n) : i.set(e, n),
				n
			);
		function s(e, i = !1) {
			let n = window.crypto.getRandomValues(new Uint32Array(1))[0],
				t = `_${n}`;
			return (
				Object.defineProperty(window, t, {
					value: (n) => (
						i && Reflect.deleteProperty(window, t), e?.(n)
					),
					writable: !1,
					configurable: !0,
				}),
				n
			);
		}
		n(
			{},
			{
				Channel: () => o,
				PluginListener: () => _,
				addPluginListener: () => w,
				convertFileSrc: () => c,
				invoke: () => u,
				transformCallback: () => s,
			},
		);
		var r,
			o = class {
				constructor() {
					(this.__TAURI_CHANNEL_MARKER__ = !0),
						((e, i, n) => {
							if (i.has(e))
								throw TypeError(
									"Cannot add the same private member more than once",
								);
							i instanceof WeakSet ? i.add(e) : i.set(e, n);
						})(this, r, () => {}),
						(this.id = s((e) => {
							l(this, r).call(this, e);
						}));
				}
				set onmessage(e) {
					a(this, r, e);
				}
				get onmessage() {
					return l(this, r);
				}
				toJSON() {
					return `__CHANNEL__:${this.id}`;
				}
			};
		r = new WeakMap();
		var _ = class {
			constructor(e, i, n) {
				(this.plugin = e), (this.event = i), (this.channelId = n);
			}
			async unregister() {
				return u(`plugin:${this.plugin}|remove_listener`, {
					event: this.event,
					channelId: this.channelId,
				});
			}
		};
		async function w(e, i, n) {
			let t = new o();
			return (
				(t.onmessage = n),
				u(`plugin:${e}|register_listener`, {
					event: i,
					handler: t,
				}).then(() => new _(e, i, t.id))
			);
		}
		async function u(e, i = {}, n) {
			return new Promise((t, l) => {
				let a = s((e) => {
						t(e), Reflect.deleteProperty(window, `_${r}`);
					}, !0),
					r = s((e) => {
						l(e), Reflect.deleteProperty(window, `_${a}`);
					}, !0);
				window.__TAURI_IPC__({
					cmd: e,
					callback: a,
					error: r,
					payload: i,
					options: n,
				});
			});
		}
		function c(e, i = "asset") {
			return window.__TAURI__.convertFileSrc(e, i);
		}
		n(
			{},
			{
				TauriEvent: () => h,
				emit: () => b,
				listen: () => y,
				once: () => I,
			},
		);
		var d,
			h = ((e) => (
				(e.WINDOW_RESIZED = "tauri://resize"),
				(e.WINDOW_MOVED = "tauri://move"),
				(e.WINDOW_CLOSE_REQUESTED = "tauri://close-requested"),
				(e.WINDOW_CREATED = "tauri://window-created"),
				(e.WINDOW_DESTROYED = "tauri://destroyed"),
				(e.WINDOW_FOCUS = "tauri://focus"),
				(e.WINDOW_BLUR = "tauri://blur"),
				(e.WINDOW_SCALE_FACTOR_CHANGED = "tauri://scale-change"),
				(e.WINDOW_THEME_CHANGED = "tauri://theme-changed"),
				(e.WINDOW_FILE_DROP = "tauri://file-drop"),
				(e.WINDOW_FILE_DROP_HOVER = "tauri://file-drop-hover"),
				(e.WINDOW_FILE_DROP_CANCELLED = "tauri://file-drop-cancelled"),
				(e.MENU = "tauri://menu"),
				e
			))(h || {});
		async function p(e, i) {
			await u("plugin:event|unlisten", { event: e, eventId: i });
		}
		async function y(e, i, n) {
			return u("plugin:event|listen", {
				event: e,
				windowLabel: n?.target,
				handler: s(i),
			}).then((i) => async () => p(e, i));
		}
		async function I(e, i, n) {
			return y(
				e,
				(n) => {
					i(n), p(e, n.id).catch(() => {});
				},
				n,
			);
		}
		async function b(e, i, n) {
			await u("plugin:event|emit", {
				event: e,
				windowLabel: n?.target,
				payload: i,
			});
		}
		class g {
			constructor(e, i) {
				(this.type = "Logical"), (this.width = e), (this.height = i);
			}
		}
		class E {
			constructor(e, i) {
				(this.type = "Physical"), (this.width = e), (this.height = i);
			}
			toLogical(e) {
				return new g(this.width / e, this.height / e);
			}
		}
		class O {
			constructor(e, i) {
				(this.type = "Logical"), (this.x = e), (this.y = i);
			}
		}
		class A {
			constructor(e, i) {
				(this.type = "Physical"), (this.x = e), (this.y = i);
			}
			toLogical(e) {
				return new O(this.x / e, this.y / e);
			}
		}
		(e.UserAttentionType = void 0),
			((d = e.UserAttentionType || (e.UserAttentionType = {}))[
				(d.Critical = 1)
			] = "Critical"),
			(d[(d.Informational = 2)] = "Informational");
		class m {
			constructor(e) {
				(this._preventDefault = !1),
					(this.event = e.event),
					(this.windowLabel = e.windowLabel),
					(this.id = e.id);
			}
			preventDefault() {
				this._preventDefault = !0;
			}
			isPreventDefault() {
				return this._preventDefault;
			}
		}
		function R() {
			return new v(window.__TAURI_METADATA__.__currentWindow.label, {
				skip: !0,
			});
		}
		function N() {
			return window.__TAURI_METADATA__.__windows.map(
				(e) => new v(e.label, { skip: !0 }),
			);
		}
		const T = ["tauri://created", "tauri://error"];
		class v {
			constructor(e, i = {}) {
				(this.label = e),
					(this.listeners = Object.create(null)),
					(null == i ? void 0 : i.skip) ||
						window
							.__TAURI_INVOKE__("plugin:window|create", {
								options: { ...i, label: e },
							})
							.then(async () => this.emit("tauri://created"))
							.catch(async (e) => this.emit("tauri://error", e));
			}
			static getByLabel(e) {
				return N().some((i) => i.label === e)
					? new v(e, { skip: !0 })
					: null;
			}
			static getCurrent() {
				return R();
			}
			static getAll() {
				return N();
			}
			static async getFocusedWindow() {
				for (const e of N()) if (await e.isFocused()) return e;
				return null;
			}
			async listen(e, i) {
				return this._handleTauriEvent(e, i)
					? Promise.resolve(() => {
							const n = this.listeners[e];
							n.splice(n.indexOf(i), 1);
						})
					: y(e, i, { target: this.label });
			}
			async once(e, i) {
				return this._handleTauriEvent(e, i)
					? Promise.resolve(() => {
							const n = this.listeners[e];
							n.splice(n.indexOf(i), 1);
						})
					: I(e, i, { target: this.label });
			}
			async emit(e, i) {
				if (T.includes(e)) {
					for (const n of this.listeners[e] || [])
						n({
							event: e,
							id: -1,
							windowLabel: this.label,
							payload: i,
						});
					return Promise.resolve();
				}
				return b(e, i, { target: this.label });
			}
			_handleTauriEvent(e, i) {
				return (
					!!T.includes(e) &&
					(e in this.listeners
						? this.listeners[e].push(i)
						: (this.listeners[e] = [i]),
					!0)
				);
			}
			async scaleFactor() {
				return window.__TAURI_INVOKE__("plugin:window|scale_factor", {
					label: this.label,
				});
			}
			async innerPosition() {
				return window
					.__TAURI_INVOKE__("plugin:window|inner_position", {
						label: this.label,
					})
					.then(({ x: e, y: i }) => new A(e, i));
			}
			async outerPosition() {
				return window
					.__TAURI_INVOKE__("plugin:window|outer_position", {
						label: this.label,
					})
					.then(({ x: e, y: i }) => new A(e, i));
			}
			async innerSize() {
				return window
					.__TAURI_INVOKE__("plugin:window|inner_size", {
						label: this.label,
					})
					.then(({ width: e, height: i }) => new E(e, i));
			}
			async outerSize() {
				return window
					.__TAURI_INVOKE__("plugin:window|outer_size", {
						label: this.label,
					})
					.then(({ width: e, height: i }) => new E(e, i));
			}
			async isFullscreen() {
				return window.__TAURI_INVOKE__("plugin:window|is_fullscreen", {
					label: this.label,
				});
			}
			async isMinimized() {
				return window.__TAURI_INVOKE__("plugin:window|is_minimized", {
					label: this.label,
				});
			}
			async isMaximized() {
				return window.__TAURI_INVOKE__("plugin:window|is_maximized", {
					label: this.label,
				});
			}
			async isFocused() {
				return window.__TAURI_INVOKE__("plugin:window|is_focused", {
					label: this.label,
				});
			}
			async isDecorated() {
				return window.__TAURI_INVOKE__("plugin:window|is_decorated", {
					label: this.label,
				});
			}
			async isResizable() {
				return window.__TAURI_INVOKE__("plugin:window|is_resizable", {
					label: this.label,
				});
			}
			async isMaximizable() {
				return window.__TAURI_INVOKE__("plugin:window|is_maximizable", {
					label: this.label,
				});
			}
			async isMinimizable() {
				return window.__TAURI_INVOKE__("plugin:window|is_minimizable", {
					label: this.label,
				});
			}
			async isClosable() {
				return window.__TAURI_INVOKE__("plugin:window|is_closable", {
					label: this.label,
				});
			}
			async isVisible() {
				return window.__TAURI_INVOKE__("plugin:window|is_visible", {
					label: this.label,
				});
			}
			async title() {
				return window.__TAURI_INVOKE__("plugin:window|title", {
					label: this.label,
				});
			}
			async theme() {
				return window.__TAURI_INVOKE__("plugin:window|theme", {
					label: this.label,
				});
			}
			async center() {
				return window.__TAURI_INVOKE__("plugin:window|center", {
					label: this.label,
				});
			}
			async requestUserAttention(i) {
				let n = null;
				return (
					i &&
						(n =
							i === e.UserAttentionType.Critical
								? { type: "Critical" }
								: { type: "Informational" }),
					window.__TAURI_INVOKE__(
						"plugin:window|request_user_attention",
						{ label: this.label, value: n },
					)
				);
			}
			async setResizable(e) {
				return window.__TAURI_INVOKE__("plugin:window|set_resizable", {
					label: this.label,
					value: e,
				});
			}
			async setMaximizable(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_maximizable",
					{ label: this.label, value: e },
				);
			}
			async setMinimizable(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_minimizable",
					{ label: this.label, value: e },
				);
			}
			async setClosable(e) {
				return window.__TAURI_INVOKE__("plugin:window|set_closable", {
					label: this.label,
					value: e,
				});
			}
			async setTitle(e) {
				return window.__TAURI_INVOKE__("plugin:window|set_title", {
					label: this.label,
					value: e,
				});
			}
			async maximize() {
				return window.__TAURI_INVOKE__("plugin:window|maximize", {
					label: this.label,
				});
			}
			async unmaximize() {
				return window.__TAURI_INVOKE__("plugin:window|unmaximize", {
					label: this.label,
				});
			}
			async toggleMaximize() {
				return window.__TAURI_INVOKE__(
					"plugin:window|toggle_maximize",
					{ label: this.label },
				);
			}
			async minimize() {
				return window.__TAURI_INVOKE__("plugin:window|minimize", {
					label: this.label,
				});
			}
			async unminimize() {
				return window.__TAURI_INVOKE__("plugin:window|unminimize", {
					label: this.label,
				});
			}
			async show() {
				return window.__TAURI_INVOKE__("plugin:window|show", {
					label: this.label,
				});
			}
			async hide() {
				return window.__TAURI_INVOKE__("plugin:window|hide", {
					label: this.label,
				});
			}
			async close() {
				return window.__TAURI_INVOKE__("plugin:window|close", {
					label: this.label,
				});
			}
			async setDecorations(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_decorations",
					{ label: this.label, value: e },
				);
			}
			async setShadow(e) {
				return window.__TAURI_INVOKE__("plugin:window|set_shadow", {
					label: this.label,
					value: e,
				});
			}
			async setEffects(e) {
				return window.__TAURI_INVOKE__("plugin:window|set_effects", {
					label: this.label,
					value: e,
				});
			}
			async clearEffects() {
				return window.__TAURI_INVOKE__("plugin:window|set_effects", {
					label: this.label,
					value: null,
				});
			}
			async setAlwaysOnTop(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_always_on_top",
					{ label: this.label, value: e },
				);
			}
			async setContentProtected(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_content_protected",
					{ label: this.label, value: e },
				);
			}
			async setSize(e) {
				if (!e || ("Logical" !== e.type && "Physical" !== e.type))
					throw new Error(
						"the `size` argument must be either a LogicalSize or a PhysicalSize instance",
					);
				return window.__TAURI_INVOKE__("plugin:window|set_size", {
					label: this.label,
					value: {
						type: e.type,
						data: { width: e.width, height: e.height },
					},
				});
			}
			async setMinSize(e) {
				if (e && "Logical" !== e.type && "Physical" !== e.type)
					throw new Error(
						"the `size` argument must be either a LogicalSize or a PhysicalSize instance",
					);
				return window.__TAURI_INVOKE__("plugin:window|set_min_size", {
					label: this.label,
					value: e
						? {
								type: e.type,
								data: { width: e.width, height: e.height },
							}
						: null,
				});
			}
			async setMaxSize(e) {
				if (e && "Logical" !== e.type && "Physical" !== e.type)
					throw new Error(
						"the `size` argument must be either a LogicalSize or a PhysicalSize instance",
					);
				return window.__TAURI_INVOKE__("plugin:window|set_max_size", {
					label: this.label,
					value: e
						? {
								type: e.type,
								data: { width: e.width, height: e.height },
							}
						: null,
				});
			}
			async setPosition(e) {
				if (!e || ("Logical" !== e.type && "Physical" !== e.type))
					throw new Error(
						"the `position` argument must be either a LogicalPosition or a PhysicalPosition instance",
					);
				return window.__TAURI_INVOKE__("plugin:window|set_position", {
					label: this.label,
					value: { type: e.type, data: { x: e.x, y: e.y } },
				});
			}
			async setFullscreen(e) {
				return window.__TAURI_INVOKE__("plugin:window|set_fullscreen", {
					label: this.label,
					value: e,
				});
			}
			async setFocus() {
				return window.__TAURI_INVOKE__("plugin:window|set_focus", {
					label: this.label,
				});
			}
			async setIcon(e) {
				return window.__TAURI_INVOKE__("plugin:window|set_icon", {
					label: this.label,
					value: "string" == typeof e ? e : Array.from(e),
				});
			}
			async setSkipTaskbar(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_skip_taskbar",
					{ label: this.label, value: e },
				);
			}
			async setCursorGrab(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_cursor_grab",
					{ label: this.label, value: e },
				);
			}
			async setCursorVisible(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_cursor_visible",
					{ label: this.label, value: e },
				);
			}
			async setCursorIcon(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_cursor_icon",
					{ label: this.label, value: e },
				);
			}
			async setCursorPosition(e) {
				if (!e || ("Logical" !== e.type && "Physical" !== e.type))
					throw new Error(
						"the `position` argument must be either a LogicalPosition or a PhysicalPosition instance",
					);
				return window.__TAURI_INVOKE__(
					"plugin:window|set_cursor_position",
					{
						label: this.label,
						value: { type: e.type, data: { x: e.x, y: e.y } },
					},
				);
			}
			async setIgnoreCursorEvents(e) {
				return window.__TAURI_INVOKE__(
					"plugin:window|set_ignore_cursor_events",
					{ label: this.label, value: e },
				);
			}
			async startDragging() {
				return window.__TAURI_INVOKE__("plugin:window|start_dragging", {
					label: this.label,
				});
			}
			async onResized(e) {
				return this.listen(h.WINDOW_RESIZED, (i) => {
					(i.payload = W(i.payload)), e(i);
				});
			}
			async onMoved(e) {
				return this.listen(h.WINDOW_MOVED, (i) => {
					(i.payload = D(i.payload)), e(i);
				});
			}
			async onCloseRequested(e) {
				return this.listen(h.WINDOW_CLOSE_REQUESTED, (i) => {
					const n = new m(i);
					Promise.resolve(e(n)).then(() => {
						if (!n.isPreventDefault()) return this.close();
					});
				});
			}
			async onFocusChanged(e) {
				const i = await this.listen(h.WINDOW_FOCUS, (i) => {
						e({ ...i, payload: !0 });
					}),
					n = await this.listen(h.WINDOW_BLUR, (i) => {
						e({ ...i, payload: !1 });
					});
				return () => {
					i(), n();
				};
			}
			async onScaleChanged(e) {
				return this.listen(h.WINDOW_SCALE_FACTOR_CHANGED, e);
			}
			async onMenuClicked(e) {
				return this.listen(h.MENU, e);
			}
			async onFileDropEvent(e) {
				const i = await this.listen(h.WINDOW_FILE_DROP, (i) => {
						e({
							...i,
							payload: { type: "drop", paths: i.payload },
						});
					}),
					n = await this.listen(h.WINDOW_FILE_DROP_HOVER, (i) => {
						e({
							...i,
							payload: { type: "hover", paths: i.payload },
						});
					}),
					t = await this.listen(h.WINDOW_FILE_DROP_CANCELLED, (i) => {
						e({ ...i, payload: { type: "cancel" } });
					});
				return () => {
					i(), n(), t();
				};
			}
			async onThemeChanged(e) {
				return this.listen(h.WINDOW_THEME_CHANGED, e);
			}
		}
		var f, U;
		function V(e) {
			return null === e
				? null
				: {
						name: e.name,
						scaleFactor: e.scaleFactor,
						position: D(e.position),
						size: W(e.size),
					};
		}
		function D(e) {
			return new A(e.x, e.y);
		}
		function W(e) {
			return new E(e.width, e.height);
		}
		return (
			(e.Effect = void 0),
			((f = e.Effect || (e.Effect = {})).AppearanceBased =
				"appearanceBased"),
			(f.Light = "light"),
			(f.Dark = "dark"),
			(f.MediumLight = "mediumLight"),
			(f.UltraDark = "ultraDark"),
			(f.Titlebar = "titlebar"),
			(f.Selection = "selection"),
			(f.Menu = "menu"),
			(f.Popover = "popover"),
			(f.Sidebar = "sidebar"),
			(f.HeaderView = "headerView"),
			(f.Sheet = "sheet"),
			(f.WindowBackground = "windowBackground"),
			(f.HudWindow = "hudWindow"),
			(f.FullScreenUI = "fullScreenUI"),
			(f.Tooltip = "tooltip"),
			(f.ContentBackground = "contentBackground"),
			(f.UnderWindowBackground = "underWindowBackground"),
			(f.UnderPageBackground = "underPageBackground"),
			(f.Mica = "mica"),
			(f.Blur = "blur"),
			(f.Acrylic = "acrylic"),
			(e.EffectState = void 0),
			((U =
				e.EffectState ||
				(e.EffectState = {})).FollowsWindowActiveState =
				"followsWindowActiveState"),
			(U.Active = "active"),
			(U.Inactive = "inactive"),
			(e.CloseRequestedEvent = m),
			(e.LogicalPosition = O),
			(e.LogicalSize = g),
			(e.PhysicalPosition = A),
			(e.PhysicalSize = E),
			(e.Window = v),
			(e.availableMonitors = async function () {
				return window
					.__TAURI_INVOKE__("plugin:window|available_monitors")
					.then((e) => e.map(V));
			}),
			(e.currentMonitor = async function () {
				return window
					.__TAURI_INVOKE__("plugin:window|current_monitor")
					.then(V);
			}),
			(e.getAll = N),
			(e.getCurrent = R),
			(e.primaryMonitor = async function () {
				return window
					.__TAURI_INVOKE__("plugin:window|primary_monitor")
					.then(V);
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "window", {
		value: __TAURI_WINDOW__,
	});
}
