export const genericErrorType = 'ERROR';
export default function genericErrorAction(error) {
  return {
    type: genericErrorType,
    error,
  };
}
