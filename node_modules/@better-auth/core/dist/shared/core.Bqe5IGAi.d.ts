import { D as DBFieldAttribute } from './core.CajxAutx.js';

type BetterAuthPluginDBSchema = {
    [table in string]: {
        fields: {
            [field in string]: DBFieldAttribute;
        };
        disableMigration?: boolean;
        modelName?: string;
    };
};

export type { BetterAuthPluginDBSchema as B };
