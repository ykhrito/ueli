import type { ActionHandler } from "@Core/ActionHandler";
import type { Logger } from "@Core/Logger";
import type { SearchResultItemAction } from "@common/Core";
import { WorkflowActionArgumentDecoder } from "./Utility";
import type { WorkflowActionHandler } from "./WorkflowActionHandler/WorkflowActionHandler";

export class WorkflowHandler implements ActionHandler {
    public readonly id = "Workflow";

    public constructor(
        private readonly logger: Logger,
        private workflowActionHandlers: Record<string, WorkflowActionHandler>,
    ) {}

    public async invokeAction(action: SearchResultItemAction): Promise<void> {
        const workflowActions = WorkflowActionArgumentDecoder.decodeArgument(action.argument);

        const promises = workflowActions
            .filter((w) => Object.keys(this.workflowActionHandlers).includes(w.handlerId))
            .map((w) => this.workflowActionHandlers[w.handlerId].invokeWorkflowAction(w));

        const promiseResults = await Promise.allSettled(promises);

        for (const promiseResult of promiseResults) {
            if (promiseResult.status === "rejected") {
                this.logger.error(`Error occured while invoking workflow action: ${promiseResult.reason}`);
            }
        }
    }
}
