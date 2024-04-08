import type { App } from "electron";

export class SingleInstaneLockModule {
    public static bootstrap(app: App) {
        if (!app.requestSingleInstanceLock()) {
            console.log("Quitting application. Reason: another instance is already running");
            app.quit();
        }
    }
}
