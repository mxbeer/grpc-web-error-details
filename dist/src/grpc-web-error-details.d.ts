import { Status } from "../lib/status_pb";
import * as ErrorDetailsPb from "../lib/error_details_pb";
export declare type ErrorDetails = ErrorDetailsPb.RetryInfo | ErrorDetailsPb.DebugInfo | ErrorDetailsPb.QuotaFailure | ErrorDetailsPb.ErrorInfo | ErrorDetailsPb.PreconditionFailure | ErrorDetailsPb.BadRequest | ErrorDetailsPb.RequestInfo | ErrorDetailsPb.ResourceInfo | ErrorDetailsPb.Help | ErrorDetailsPb.LocalizedMessage;
export declare function statusFromError(err: any | {
    metadata: {
        "grpc-status-details-bin"?: string;
    };
}): [Status, ErrorDetails[]] | [null, null];
//# sourceMappingURL=grpc-web-error-details.d.ts.map