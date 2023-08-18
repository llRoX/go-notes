import React, { useEffect, useMemo, useState } from 'react';
import { marked } from "marked";
import api from "../../api/files";
import "./FileEditor.scss"
interface props {
    path: string
}

type mode = "edit" | "view";

const FileEditor = (props: props) => {

    const [markdown, setMarkdown] = useState();
    const [mode, setMode] = useState<mode>('edit')


    useEffect(() => {
        api.getFile(props.path)
            .then(({ data }) => data)
            .then((markdown) => setMarkdown(markdown))
            .catch(console.error);
    }, [props.path])


    const html = useMemo(() => {
        if (markdown) {
            return marked.parse(markdown);
        }
        return <div></div>;
    }, [markdown]);


    const switchMode = () => {
        switch (mode) {
            case 'edit': {
                setMode('view');
                break;
            }
            case 'view': {
                setMode('edit');
                break;
            }
        }
    }

    const selectButton = () => {
        switch (mode) {
            case 'edit': {
                return <button onClick={switchMode}>Preview</button>;
            }
            case 'view': {
                return <button onClick={switchMode}>Edit</button>
            }
        }
    }

    const selectContent = () => {
        switch (mode) {
            case 'edit': {
                return (<textarea onChange={(e) => setMarkdown(e.target.value)} className="file-editor-editor">{markdown}</textarea>);
            }
            case 'view': {
                return (<div className="file-editor-formatted" dangerouslySetInnerHTML={{ __html: html }} />
                )
            }
            default: {
                return <div></div>
            }
        }
    }



    return (
        <div className="file-editor">
            <div className="file-editor-header">
                <h2>{props.path}</h2>
                <div className="file-editor-header-buttons">
                    <button>Save</button>
                    {selectButton()}
                </div>

            </div>
            {selectContent()}
        </div>
    )
}

export default FileEditor