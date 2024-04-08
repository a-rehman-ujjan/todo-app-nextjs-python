"use server";

import { revalidatePath } from "next/cache";
import { Content } from "next/font/google";

export async function add_todo(
  state: { status: ""; message: "" },
  formData: FormData
) {
  const new_todo = formData.get("add_task") as string;

  try {
    const response = await fetch("http://127.0.0.1:8000/todos/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ content: new_todo }),
    });
    revalidatePath("/todos");
    return { status: "Success", message: "Todo Added Successfully!" };
  } catch (error) {
    return { status: "Error", message: "Something Went Wrong" };
  }
}

export async function edit_todo(
  state: { status: ""; message: "" },
  {
    id,
    content,
    is_completed,
  }: { id: number; content: string; is_completed: boolean }
) {
  // const new_todo = formData.get('add_task') as string

  try {
    const response = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        content,
        is_completed,
      }) 
    });
    const res = await response.json();
    if (res.content) {
        revalidatePath("/todos/");
        return { status: "Success", message: "Todo Edited Successfully!" };
    } else {
        return { status: "error", message: "Not Found" };
    }
  } catch (error) {
    return { status: "Error", message: "Something Went Wrong" };
  }
}


export async function status_change(id: number, content: string, is_completed: boolean) {
    try{
        const response =  await fetch(`http://127.0.0.1:8000/todos/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                content:content,
                is_completed: !is_completed
            }),
        })
        const res = await response.json();
        if (res.content) {
            revalidatePath("/todos/");
            return { status: "success", message: "Status changed successfully" };
        } else {
            return { status: "error", message: "Not Found" };
        }
    }catch(error){
        return {status: "Error", message: "Something Went Wrong"};
    }
}

export async function delete_todo(id: number){
   try{
    const response = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const res = await response.json();
    if(res.message){
        revalidatePath("/todos/");
        return { status: "Success", message: res.message };
    } else {
        return { status: "Error", message: "Something went wrong" };
    }
   }catch(error){
    return {status: "Error", message: "Something Went Wrong"};
   }
}