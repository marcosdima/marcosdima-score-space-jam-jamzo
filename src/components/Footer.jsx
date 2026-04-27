import { FooterContainer, FooterLink } from '@styles';
import { useI18n } from '../hooks/i18n';

const Footer = () => {
  const { t } = useI18n();
  return (
    <FooterContainer>
      <span>{t('created_by')}</span>
      <FooterLink href="https://github.com/marcosdima" target="_blank" rel="noreferrer">
        marcosdima
      </FooterLink>
    </FooterContainer>
  );
};

export default Footer;
