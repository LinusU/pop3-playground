import Uppie from 'uppie'
import fileToArrayBuffer from 'file-to-array-buffer'
import raf from 'raf'

import initGraphics from '@pop3/graphics'

import Menu from './menu'

const uppie = new Uppie()

function loadLanguage (file) {
  const result = []
  const view = new Uint16Array(file)

  let buffer = ''
  for (let i = 0; i < view.length; i++) {
    if (view[i] === 0) {
      result.push(buffer)
      buffer = ''
    } else {
      buffer += String.fromCharCode(view[i])
    }
  }

  return result
}

uppie(document.getElementById('dropzone'), async (_, formData) => {
  const raw = Array.from(formData.entries(), item => item[1])
  const load = (name) => fileToArrayBuffer(raw.find(file => file.name.toLowerCase().endsWith(name)))

  const files = new Map([
    // ['data/fenew/feboxes.spr', await load('data/fenew/feboxes.spr')],
    // ['data/fenew/feboxsp.spr', await load('data/fenew/feboxsp.spr')],
    // ['data/hfx0-0.dat', await load('data/hfx0-0.dat')],
    // ['data/hspr0-0.dat', await load('data/hspr0-0.dat')],

    ['data/backpal.dat', await load('data/backpal.dat')],
    ['data/fenew/febackg0.dat', await load('data/fenew/febackg0.dat')],
    ['data/fenew/fecursor.spr', await load('data/fenew/fecursor.spr')],
    ['data/fenew/feft33we.spr', await load('data/fenew/feft33we.spr')],
    ['data/fenew/fehi33we.spr', await load('data/fenew/fehi33we.spr')],
    ['data/fenew/felgsden.spr', await load('data/fenew/felgsden.spr')],
    ['data/fenew/felgspen.spr', await load('data/fenew/felgspen.spr')],
    ['data/fenew/felo20we.spr', await load('data/fenew/felo20we.spr')],
    ['data/fenew/felo33we.spr', await load('data/fenew/felo33we.spr')],
    ['data/fenew/fepal0.dat', await load('data/fenew/fepal0.dat')],
    ['data/fenew/fepal1.dat', await load('data/fenew/fepal1.dat')],
    ['data/fenew/fepointe.spr', await load('data/fenew/fepointe.spr')],
    ['data/fenew/fesd33we.spr', await load('data/fenew/fesd33we.spr')],
    ['language/lang00.dat', await load('language/lang00.dat')],
  ])

  const graphics = initGraphics(files)

  const palette0 = graphics.getPalette('data/fenew/fepal0.dat')
  const palette1 = graphics.getPalette('data/fenew/fepal1.dat')
  const backpal = graphics.getPalette('data/backpal.dat')

  const background = graphics.getRawSprite('data/fenew/febackg0.dat', 640, 480).render(palette0)

  const largeTextFont = graphics.getFont('data/fenew/felo33we.spr', 'data/fenew/fepal0.dat')
  const smallTextFont = graphics.getFont('data/fenew/felo20we.spr', 'data/fenew/fepal0.dat')
  const textLinkFont = graphics.getFont('data/fenew/feft33we.spr', 'data/fenew/fepal0.dat')
  const textLinkHighlightFont = graphics.getFont('data/fenew/fehi33we.spr', 'data/fenew/fepal0.dat')
  const textLinkShadowFont = graphics.getFont('data/fenew/fesd33we.spr', null)

  const logo = graphics.getSprites('data/fenew/felgspen.spr').map(s => s.render(palette0))
  const logoShadow = graphics.getSprites('data/fenew/felgsden.spr')[0].render(null)

  const cursors = graphics.getSprites('data/fenew/fecursor.spr').map(s => s.render(null))
  const pointer = graphics.getSprites('data/fenew/fepointe.spr')[0].render(palette0)

  const language = loadLanguage(files.get('language/lang00.dat'))

  const menu = new Menu(graphics, [
    { text: language[309] },
    { text: language[299] },
    { text: language[300] },
    { text: language[307] },
    { text: language[326] },
    { text: language[334] },
    { text: language[445] },
    { text: language[447] },
    { text: language[308] }
  ])

  const canvas = document.createElement('canvas')

  canvas.width = 640
  canvas.height = 480

  const context = canvas.getContext('2d')

  context.imageSmoothingEnabled = false

  document.body.removeChild(document.getElementById('dropzone'))
  document.body.appendChild(canvas)

  canvas.style.cursor = 'none'

  let mouseX = 0
  let mouseY = 0

  canvas.addEventListener('mousemove', (ev) => {
    mouseX = ev.offsetX
    mouseY = ev.offsetY
  })

  const versionText = smallTextFont.renderText('version 1.03 @ nov 25 1998 14:19:50')

  let i = 0
  const draw = () => {
    const tick = (i++ >> 2)

    // console.time('draw')

    context.drawImage(background, 0, 0)
    context.drawImage(cursors[tick % cursors.length], mouseX - 64, mouseY - 64)

    {
      const x = canvas.width / 2
      const y = 10 + (logo[0].height / 2)

      context.globalAlpha = 0.3

      const offsetX = (x - mouseX) / 32
      const offsetY = (y - mouseY) / 32

      context.drawImage(logoShadow, 174 + offsetX, 2 + offsetY)
      context.globalAlpha = 1.0

      context.drawImage(logo[0], 180, 10)
      context.drawImage(logo[1], 460, 10)
    }

    menu.draw(context, mouseX, mouseY)

    context.drawImage(versionText, 10, 480 - versionText.height - 1)

    context.drawImage(pointer, mouseX - 1, mouseY - 1)

    // console.timeEnd('draw')

    raf(draw)
  }

  raf(draw)
})
