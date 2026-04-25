import { useI18n } from '@hooks'

const MainMenu = () => {
  const { t } = useI18n()

  return (
    <div className="main-menu">
      <h1>Score Jump Jam Jamzo</h1>
      <div>
        <h2>{t('menu.play')}</h2>
        <h2>{t('menu.exit')}</h2>
      </div>
    </div>
  )
}

export default MainMenu