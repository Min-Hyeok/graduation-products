import { toast } from 'react-toastify';

const useParseError = (error: object) => {
  const parseError = JSON.parse(JSON.stringify(error));
  const errorMessage = parseError?.graphQLErrors?.pop().extensions.response.message || [];

  errorMessage.forEach((message: string, index: number) => {
    if (index < 2) toast(message);
  });
};

export default useParseError;
