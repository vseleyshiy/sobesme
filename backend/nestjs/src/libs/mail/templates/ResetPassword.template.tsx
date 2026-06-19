import { Body, Heading, Link, Text } from '@react-email/components';
import { Html } from '@react-email/html';

interface IResetPasswordTemplateProps {
  domain: string;
  token: string;
}

export function ResetPasswordTemplate(props: IResetPasswordTemplateProps) {
  const { domain, token } = props;

  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  return (
    <Html>
      <Body>
        <Heading>Сброс пароля</Heading>
        <Text>
          Привет! Вы запросили сброс пароля. Пожалуйста, перейдите по следующей
          ссылке, чтобы создать новый пароль:
        </Text>
        <Link href={confirmLink}>Подтвердить сброс пароля</Link>
        <Text>
          Эта ссылка действительна в течение 1 часа. Если вы не запрашивали
          сброс пароля, просто проигнорируйте это сообщение.
        </Text>
        <Text>Спасибо за использование нашего сервиса!</Text>
      </Body>
    </Html>
  );
}
