"use client"

import React, { useState, useEffect } from 'react'
import EventTable from './EventTable'
import { getAllActivities } from '@/app/admin/activities/services/activities.services';

function ActivitiesSection() {

const [page, setPage] = useState(1);
const [activities, setActivities] = useState([]);

useEffect(() => {
    const getActivities = async () => {
        try {
            const data = await getAllActivities({ page });
            if(data)
                setActivities((prevActivities) => [...prevActivities, ...data]);
        } catch (error) {
                console.error("Error getting activities:", error);
        }
    };
    getActivities();
}, []);

  return (
    <EventTable
      activities={activities}
    />
  )
}

export default ActivitiesSection