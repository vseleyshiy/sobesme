import { Body, Heading, Link, Text } from '@react-email/components';
import { Html } from '@react-email/html';

interface IConfirmationTemplateProps {
  domain: string;
  token: string;
}

export function ConfirmationTemplate(props: IConfirmationTemplateProps) {
  const { domain, token } = props;

  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return (
    <Html>
      <Body>
        <Heading>Подтверждение почты</Heading>
        <Text>
          Привет! Чтобы подтвердить свой адрес электронной почты, пожалуйста,
          перейди по ссылке ниже:
        </Text>
        <Link href={confirmLink}>Подтвердить почту</Link>
        <Text>
          Эта ссылка действительна в течение 1 часа. Если вы не запрашивали
          подтверждение, просто проигнорируйте это сообщение.
        </Text>
        <Text>Спасибо за использование нашего сервиса!</Text>
      </Body>
    </Html>
  );
}
