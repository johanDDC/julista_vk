import * as React from "react";

export interface PanelProps {
    id: string
    switchPanel: (panel: string) => void,
    switchView?: (view: string, panel: string) => void
}

export interface ViewProps {
    id: string
    activePanel: string
    modal: string
    popout: React.ReactChild
}

export interface VkParamsProps {
    id?: number
    secret?: string
    vk_user_id: string
}


export interface InfoResponse {
    class_name: string
    name: {
        first_name: string
        last_name: string
        middle_name: string
    }
    status: string

    exp: number
    student_id: number

    personal: {
        phone: string
        email: string
        birth_date: string
        sex: string
    }
}