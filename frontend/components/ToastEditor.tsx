import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';

const ToastEditor = ({ placeholder, ...props }: EditorProps) => (
  <Editor
    {...props}
    placeholder={placeholder}
    initialValue=""
    height="650px"
    previewStyle="vertical"
    initialEditType="wysiwyg"
    useCommandShortcut
  />
);

export default ToastEditor;
