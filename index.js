const KsMf = require('ksmf');
const { createAgent } = require('@forestadmin/agent');
const { createSequelizeDataSource } = require('@forestadmin/datasource-sequelize');
const ioc = require("./cfg/ioc.json");

class ForestModule extends KsMf.app.Module {

    init() {
        this.rest = false;
        super.init();
        this.helper.configure({ src: ioc });
    }

    async onLoadedModules() {
        const app = this.helper.get('app');
        const dao = this.helper.get('dao');
        const web = app.web;
        const env = app.cfg.env;
        const eid = app.cfg.eid;
        const forestAgent = createAgent({
            authSecret: env.FOREST_AUTH_SECRET,
            envSecret: env.FOREST_ENV_SECRET,
            isProduction: eid === 'production',
        });
        forestAgent
            .addDataSource(createSequelizeDataSource(dao.driver))
            .mountOnExpress(web)
            .start();

        const logger = this.helper.get('logger');
        if (logger) {
            logger.info({
                src: "Module:ForestAdmin:initApp",
                data: {
                    'URL': 'https://app.forestadmin.com/projects',
                    models: Object.keys(dao.models)
                }
            });
        }
    }
}
module.exports = ForestModule;