import type { SearchResultItemAction } from "@common/SearchResultItemAction";
import type { ActionHandler } from "@Core/ActionHandler";
import type { UeliCommandInvoker } from "@Core/UeliCommand";

export class UeliCommandActionHandler implements ActionHandler {
    public readonly id = "UeliCommand";

    public constructor(private readonly ueliCommandInvoker: UeliCommandInvoker) {}

    public invokeAction(action: SearchResultItemAction): Promise<void> {
        const map: Record<string, () => Promise<void>> = {
            quit: () => this.ueliCommandInvoker.invokeUeliCommand("quit"),
            settings: () => this.ueliCommandInvoker.invokeUeliCommand("openSettings"),
            extensions: () => this.ueliCommandInvoker.invokeUeliCommand("openExtensions"),
        };

        return map[action.argument]();
    }
}