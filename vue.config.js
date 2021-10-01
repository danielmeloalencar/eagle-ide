module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Eagle IDE",
        appId: "com.eagleide.app",
        nsis: {
          oneClick: false,
          perMachine: true,
          allowToChangeInstallationDirectory: true
        },
          fileAssociations: [
          {
            ext: "eagle",
            name: "Eagle File",
            role: "Editor",
           }
        ],

        }
      }
    }
  }

