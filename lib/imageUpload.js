/**
 * Handle image upload for adding project
 * @param {Object} files - available on request object
 * @param {String} fileName - name attribute set on file upload input
 */
module.exports = (files, fileName) => {
  const file = files[fileName]
  const name = file.name
  file.mv(`./public/images/${name}`)
}