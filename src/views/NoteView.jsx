import TabBar from "../components/TabBar/TabBar";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { complete } from '../utils/service'
import { TextArea, Button, Avatar, DotLoading } from "antd-mobile";
import image  from '../assets/react.svg'

function Note() {
    const userInfo = useSelector((state) => state.data.userInfo);
    const navigate = useNavigate()
    const [state, setState] = useState({
        messageList: [],
        query: ''
    })
    const [loading, setLoading] = useState(false)
    const boxRef = useRef(null)

    useEffect(() => {
        const msg = {
            content: '你是用户的朋友，请用朋友间的语气和态度来回答用户的问题，不需要太正式，回复的字数尽量简短，不要出现当然可以之类的话',
            role: 'user',
            hide: true
        }
        const initMessageList = [...state.messageList, msg]
        setState(pre => ({...pre.messageList, messageList: initMessageList}))
        send(initMessageList)
    }, [])

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight
        }
    }, [state.messageList])


    async function send(newMessageList) {
        setLoading(true)
        const res = await complete({message: newMessageList})
        const updateMessagelist = [...newMessageList, res.choices[0].message]
        setState(pre => ({ ...pre, messageList: updateMessagelist }))
        setLoading(false)
    }

    function setQuery(value) {
        setState(pre => ({...pre, query: value}))
    }

    function submit() {
        let data = {
            content: state.query,
            role: 'user'
        };
        const newMessageList = [...state.messageList, data]
        setState(pre => ({ ...pre, messageList: newMessageList, query: '' }))
        send(newMessageList)
    }

    // async function init() {
    //     const res = await getNote()
    //     if (res.code === 200) {
    //         setState((pre) => ({
    //             ...pre,
    //             noteList: res.data.list
    //         }))
    //     }
    // }


    return (
        <>
            <TabBar></TabBar>
            <div className="container">
                <div className="message-box" ref={boxRef}>
                    <div style={{width: '100%', minHeight: '200px'}}>
                    {state.messageList.length > 0 && state.messageList?.map((item, index) => (
                        <div key={index}>
                        {item?.role === 'user' && !item.hide && <div className="right">
                            <p>{item.content}</p>
                            <Avatar src={userInfo.avatar} style={{'marginLeft': 10}} />
                        </div>}
                        {item?.role === 'assistant' && !item.hide && <div className="left">
                            <Avatar src={image} style={{'marginRight': 10}} />
                            <p dangerouslySetInnerHTML={{__html: item.content}}></p>
                        </div>}
                        </div>
                    ))}
                    </div>
                    {loading && <div className="loading">
                        <DotLoading/>
                    </div>}

                </div>
                <div className="input-box">
                    <TextArea
                        placeholder='请输入内容'
                        autoSize={{minRows: 3, maxRows: 5}}
                        showCount
                        value={state.query}
                        onChange={val => setQuery(val)}
                    />
                </div>
                <Button block color='success' size='large' onClick={submit}>
                    提交
                </Button>
            </div>
        </>
    );
}

export default Note;
