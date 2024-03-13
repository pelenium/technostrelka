import { css } from 'styled-components';
import { Color as PaletteColor } from '../../utils/types/palette';
export var activeDotMixin = function activeDotMixin(_ref) {
  var theme = _ref.theme;
  return css(["background-color:", ";"], theme.palette[PaletteColor.AccentPrimary]);
};