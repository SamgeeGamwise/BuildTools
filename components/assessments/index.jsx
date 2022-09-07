import React, { useState, useEffect } from 'react'
import Assessment from './Assessment'

export default function Assessments(props) {
    const renderAssessment = () => {
        const assessmentsList = Object.keys(props.assessments).map(pid => ({ pid: pid, ...props.assessments[pid] }))

        return assessmentsList.map((assessment, index) => {
            return (
                <Assessment key={index} assessment={assessment} identify={assessment.clientRoot.replace("/", "") + assessment.pid} />
            )
        })
    }

    return (
        <>
            <table className="table table-light">
                <thead>
                    <tr >
                        <th>{props.assessments[Object.keys(props.assessments)[0]].clientRoot.replace("/", "")}</th>
                    </tr>
                </thead>
                <tbody>
                    {renderAssessment()}
                </tbody>
            </table>
        </>
    )
}
