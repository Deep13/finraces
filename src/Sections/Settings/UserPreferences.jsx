import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { getSettings, changeSettings } from '../../Utils/api';

const AlertRow = ({ label, enabled, onToggle }) => {

    return (
        <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
            <p className="text-4 font-medium w-[12rem]">{label}</p>
            <div className='flex gap-2'>
                <p>{enabled ? 'On' : 'Off'}</p>
                <Switch
                    checked={enabled}
                    onChange={onToggle}
                    className="group relative data-[checked]:bg-green-600 flex h-4 w-10 cursor-pointer rounded-full dark:bg-[#000924] dark:data-[checked]:bg-green-600 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white border border-black dark:border-none top-1"
                >
                    <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block size-5 -translate-x-1 rounded-full ${enabled ? 'bg-white' : 'dark:bg-[#001A50] bg-slate-300'
                            } ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5 relative -top-[0.4rem]`}
                    />
                </Switch>
            </div>
        </div>
    );
};

const UserPreferences = () => {
    const alerts = [
        { label: 'Notifications Alerts', key: 'notification_alert' },
        { label: 'Race Alerts', key: 'race_alert' },
        { label: 'Achievement Alerts', key: 'achievement_alert' },
        { label: 'Community Alerts', key: 'community_alert' },
    ];

    const [settings, setSettings] = useState({});

    useEffect(() => {
        getSettings((data) => {
            console.log(data);
            setSettings(data);
        });
    }, []);

    const handleToggle = (key) => {
        const updatedSettings = { ...settings, [key]: !settings[key] };
        setSettings(updatedSettings);
        changeSettings({ [key]: updatedSettings[key] }, (data) => {
            console.log(`successfully updated ${key}`, data)
        });
    };

    // useEffect(() => {
    //     console.log('Settings now', settings)
    // }, [settings])

    return (
        <div className="w-full h-full flex gap-4 flex-col">
            {alerts.map((alert) => (
                <AlertRow
                    key={alert.key}
                    label={alert.label}
                    enabled={settings[alert.key]}
                    onToggle={() => handleToggle(alert.key)}
                />
            ))}
        </div>
    );
};

export default UserPreferences;
