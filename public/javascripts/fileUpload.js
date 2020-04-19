FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    styleAspectRatio: 275 / 200,
    imageResizeTargetWidth: 200,
    imageResizeTargetHeight: 275
})

FilePond.parse(document.body);