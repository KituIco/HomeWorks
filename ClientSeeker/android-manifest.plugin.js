const { withAndroidManifest } = require("@expo/config-plugins")

module.exports = function androiManifestPlugin(config) {
  return withAndroidManifest(config, async config => {
    let androidManifest = config.modResults.manifest

    // add the tools to apply permission remove
    androidManifest.$ = {
      ...androidManifest.$,
      "xmlns:tools": "http://schemas.android.com/tools",
    }

    androidManifest["service"] = androidManifest["service"].map(
      perm => {
        if (perm.$["android:name"] === "com.adyenreactnativesdk.component.dropin.AdyenCheckoutService") {
          perm.$["android:exported"] = "false"
        }
        return perm
      }
    )

    return config
  })
}