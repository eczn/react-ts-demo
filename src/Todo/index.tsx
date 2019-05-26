import * as React from "react";
import { TodoCtxProvider, todoCtx } from './TodoCtxProvider';
import { GetInputWhenClick } from './GetInputWhenClick';

import "./todo.less";

export function Todo() {
    return (
        <TodoCtxProvider>
            <todoCtx.Consumer>{ ctx => 
                <div className="todo-main">
                    <h1>Todos</h1>

                    <Todos />

                    <div className="btns">
                        <button onClick={ () => {
                            ctx.addBlankTodo()
                        } }>新建空白 Todo</button>
                        <button onClick={ ctx.saveAll }>存储到 LocalStorage</button>
                    </div>
                </div>
            }</todoCtx.Consumer>
        </TodoCtxProvider>
    )
}

function Todos() {
    const ctx = React.useContext(todoCtx);

    const $list = ctx.todos.map(todo => {
        return (
            <div className="one-todo" key={ todo.id }>
                <GetInputWhenClick onInput={text => {
                    console.log('更新标题', text);
                    ctx.updateById(todo.id, t => {
                        t.title = text;
                        return t;
                    });
                }}>
                    <div className="title">{ todo.title || '无标题' }</div>
                </GetInputWhenClick>
                
                <GetInputWhenClick onInput={text => {
                    console.log('更新内容', text);
                    ctx.updateById(todo.id, t => {
                        t.text = text;
                        return t;
                    });
                }}>
                    <div className="text">{ todo.text || '无内容' }</div>
                </GetInputWhenClick>

                <div className="time">创建于 { new Date(todo.date).toLocaleString() }</div>

                <div className="remove" onClick={ () => {
                    ctx.removeTodo(todo.id);
                } }>删除</div>
            </div>
        )
    })

    return (
        <div className="todos">
            { ctx.todos.length ?
                <>
                    { $list }
                    <div className="intro">
                        <p>点击文本可以修改内容</p>
                        <p>存储到 LocalStorage 之后页面刷新 Todos 不会消失</p>
                    </div>
                </> :
                <div className="no-todos">暂无 Todo</div> }
        </div>
    )
}
