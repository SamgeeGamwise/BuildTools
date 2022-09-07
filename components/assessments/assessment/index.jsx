export default function Assessment(props) {
    const renderAssessmentDetails = () => {
        return Object.keys(props.assessment).map((key, index) => {

            return (
                <dl key={index}>
                    <dt>{key}</dt>
                    <dd>{typeof props.assessment[key] === "object" ?
                        Object.keys(props.assessment[key]).map((secondKey, secondIndex) => {
                            return (
                                <dl key={secondIndex}>
                                    <dt>{secondKey}</dt>
                                    <dd>{props.assessment[key][secondKey]}</dd>
                                </dl>
                            )
                        }) : props.assessment[key]}
                    </dd>
                </dl>
            )

        })
    }

    return (
        <tr>
            <td>
                <button className="btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target={`#${props.identify}`}>
                    {props.assessment.assessDesc}
                </button>
                <div className="collapse" id={props.identify}>
                    {renderAssessmentDetails()}
                </div>
            </td>
        </tr >
    )
}
