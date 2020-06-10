npm i @ionic-native/media-capture
npm i @ionic-native/file
npm i @ionic-native/media
npm i @ionic-native/streaming-media
npm i @ionic-native/photo-viewer
npm i @ionic-native/image-picker
 
ionic cordova plugin add cordova-plugin-media-capture
ionic cordova plugin add cordova-plugin-file
ionic cordova plugin add cordova-plugin-media
ionic cordova plugin add cordova-plugin-streaming-media
ionic cordova plugin add com-sarriaroman-photoviewer
ionic cordova plugin add cordova-plugin-telerik-imagepicker

// For the imagepicker on Android we need a fix
cordova plugin add cordova-android-support-gradle-release
// https://github.com/wymsee/cordova-imagePicker/issues/212#issuecomment-438895540