'use client';

import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Escribe aquí...' 
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"}
      onInit={(_evt: any, editor: any) => editorRef.current = editor}
      initialValue={content}
      init={{
        height: 600,
        language: 'es',
        menubar: 'file edit view insert format tools table help',
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
          'emoticons', 'codesample', 'pagebreak', 'nonbreaking', 'directionality',
          'visualchars'
        ],
        toolbar_mode: 'sliding',
        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size:14px }',
        placeholder: placeholder,
        // Configuración del botón de imagen
        image_advtab: true,
        image_caption: true,
        image_title: true,
        automatic_uploads: false,
        file_picker_types: 'image',
        file_picker_callback: (cb: (url: string, meta?: { alt?: string }) => void, value: string, meta: { filetype: string }) => {
          if (meta.filetype === 'image') {
            // Abrir el modal de gestión de imágenes
            const event = new CustomEvent('openImagePicker', {
              detail: {
                callback: (url: string) => {
                  cb(url, { alt: 'Imagen del artículo' });
                }
              }
            });
            window.dispatchEvent(event);
          }
        },
        // Configuración de estilos
        style_formats: [
          { title: 'Encabezados', items: [
            { title: 'Título 1', format: 'h1' },
            { title: 'Título 2', format: 'h2' },
            { title: 'Título 3', format: 'h3' },
            { title: 'Título 4', format: 'h4' },
            { title: 'Título 5', format: 'h5' },
            { title: 'Título 6', format: 'h6' }
          ]},
          { title: 'Párrafo', format: 'p' },
          { title: 'Bloque', items: [
            { title: 'Cita', format: 'blockquote' },
            { title: 'Código', format: 'pre' }
          ]},
          { title: 'Inline', items: [
            { title: 'Negrita', format: 'bold' },
            { title: 'Cursiva', format: 'italic' },
            { title: 'Subrayado', format: 'underline' },
            { title: 'Tachado', format: 'strikethrough' },
            { title: 'Superíndice', format: 'superscript' },
            { title: 'Subíndice', format: 'subscript' },
            { title: 'Código', format: 'code' }
          ]}
        ],
        // Configuración de formato de bloques
        block_formats: 'Párrafo=p; Título 1=h1; Título 2=h2; Título 3=h3; Título 4=h4; Cita=blockquote; Preformateado=pre',
        // Botones personalizados
        setup: (editor: any) => {
          // Botón "Leer Más" tipo Joomla
          editor.ui.registry.addButton('readmore', {
            text: '📖 Leer Más',
            tooltip: 'Insertar separador "Leer Más" (como Joomla)',
            onAction: () => {
              editor.insertContent('<hr class="readmore" title="Leer más..." />');
            }
          });
        },
        // Toolbar con todos los botones incluyendo "Leer Más"
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'readmore pagebreak | removeformat | image link | code | help',
        // Whitelist de elementos HTML permitidos (previene XSS)
        extended_valid_elements: [
          'img[class|src|alt|title|width|height|loading|style]',
          'a[href|target|rel|class|title]',
          'iframe[src|width|height|frameborder|allowfullscreen|class|title|loading]',
          'table[class|border|cellpadding|cellspacing|style|width]',
          'tr[class|style]',
          'td[class|style|colspan|rowspan|width|height|valign]',
          'th[class|style|colspan|rowspan|width|height|valign|scope]',
          'thead[class]',
          'tbody[class]',
          'tfoot[class]',
          'hr[class|title]',
          'span[class|style]',
          'div[class|style|id]',
          'figure[class|style]',
          'figcaption[class]',
          'video[src|controls|width|height|class|poster|preload]',
          'source[src|type]',
        ].join(','),
        // Elementos no permitidos (previene inyección de scripts)
        invalid_elements: 'script,object,embed,applet,form,input,textarea,select,button',
        valid_children: '+body[style],+div[h1|h2|h3|h4|h5|h6|p|blockquote|pre|ul|ol|li|table|figure|img|a|span|div|hr]',
        // Configuración de idioma español
        language_url: 'https://cdn.jsdelivr.net/npm/tinymce-lang/langs7/es.js',
      }}
      onEditorChange={(newContent: string) => {
        onChange(newContent);
      }}
    />
  );
}
