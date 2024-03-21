export default function getLevelColor(level: number) {
  switch (level) {
    case 1:
    case 2:
    case 3:
      return '#a9d18e'
    case 4:
    case 5:
      return '#ffcccc'
    case 6:
      return '#ff99cc'
    case 7:
      return '#fff2cc'
    case 8:
    case 9:
      return '#ffd966'
    case 10:
    case 11:
    case 12:
      return '#00b0f0'
    case 13:
    case 14:
    case 15:
      return '#ffffff'
    case 16:
    case 17:
    case 18:
      return '#000000'
    default:
      return ''
  }
}
