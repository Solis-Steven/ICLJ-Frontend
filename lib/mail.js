"use server"

import nodemailer from "nodemailer"
import * as handlebars from "handlebars"
import { registerTemplate } from "./templates/register";

export async function sendMail({to, name, subject, body}) {
    const {NEXT_PUBLIC_SMTP_PASSWORD, NEXT_PUBLIC_SMTP_EMAIL} = process.env;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: NEXT_PUBLIC_SMTP_EMAIL,
            pass: NEXT_PUBLIC_SMTP_PASSWORD
        }
    });

    try {
        const testResult = await transport.verify();
    } catch (error) {
        console.log("Error test result", error);
        
        return;
    }

    try {
        const sendResult = await transport.sendMail({
            from: NEXT_PUBLIC_SMTP_EMAIL, to, subject, html: body
        });
    } catch (error) {
        console.log("Error send result", error);
    }
}

export async function compileRegisterTemplate(name, token) {
    const template = handlebars.compile(registerTemplate);
    const htmlBody = template({
        name,
        token
    });

    return(htmlBody);
}