export default class Menu {
  /**
   * @param {object[]} items
   * @param {string} items.text
   */
  constructor (graphics, items) {
    const textLinkFont = graphics.getFont('data/fenew/feft33we.spr', 'data/fenew/fepal0.dat')
    const textLinkHighlightFont = graphics.getFont('data/fenew/fehi33we.spr', 'data/fenew/fepal0.dat')
    const textLinkShadowFont = graphics.getFont('data/fenew/fesd33we.spr', null)

    let y = 140
    this.items = items.map((item) => {
      const sprites = [
        textLinkFont.renderText(item.text),
        textLinkHighlightFont.renderText(item.text),
        textLinkShadowFont.renderText(item.text)
      ]

      const cx = 320
      const cy = y + (sprites[0].height / 2)
      const x1 = 320 - (sprites[0].width / 2)
      const x2 = 320 + (sprites[0].width / 2)
      const y1 = y
      const y2 = y + sprites[0].height

      y += 30

      return { x1, x2, y1, y2, cx, cy, sprites }
    })
  }

  /**
   * @param {CanvasRenderingContext2D} context
   */
  draw (context, mouseX, mouseY) {
    context.globalAlpha = 0.3

    for (const item of this.items) {
      const offsetX = (item.cx - mouseX) / 32
      const offsetY = (item.cy - mouseY) / 32

      context.drawImage(item.sprites[2], item.x1 + offsetX, item.y1 + offsetY)
    }

    context.globalAlpha = 1.0

    for (const item of this.items) {
      const idx = (mouseX >= item.x1 && mouseX <= item.x2 && mouseY >= item.y1 && mouseY <= item.y2) ? 1 : 0
      context.drawImage(item.sprites[idx], item.x1, item.y1)
    }
  }
}
