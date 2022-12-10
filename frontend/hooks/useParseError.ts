import { toast } from 'react-toastify';

const useParseError = (error: object) => {
  const graphQLErrors = JSON.parse(JSON.stringify(error))?.graphQLErrors?.pop();

  if (graphQLErrors.extensions.exception?.message) {
    toast(graphQLErrors.extensions.exception?.message);
    return;
  }

  const errorMessage = graphQLErrors?.extensions?.response?.message || [];

  errorMessage.forEach((message: string, index: number) => {
    if (index < 2) toast(message);
  });
};

export default useParseError;
