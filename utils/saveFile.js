module.exports = function (file, forced) {
  if (file.exists() && !forced) {
    return;
  }
  file.save();
};
