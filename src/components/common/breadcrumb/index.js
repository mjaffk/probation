import React from "react"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {Link} from "react-router-dom"
import {LOCATION_DICTIONARY} from "../../../constants"


export default function ProfileBreadCrumb({location}) {
	console.log(location)
	return (<div id="breadcrumb"  >
		<Breadcrumb tag="nav" className="rounder">
			<BreadcrumbItem><Link to='/profile/'>Личный кабинет</Link></BreadcrumbItem>
			<BreadcrumbItem active>{LOCATION_DICTIONARY[location]}</BreadcrumbItem>
		</Breadcrumb>
	</div>)
}

