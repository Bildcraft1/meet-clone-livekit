'use client';

import { PreJoin } from "@livekit/components-react";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import '@livekit/components-styles';

export default function PreJoinPage() {
    const router = useRouter();
    const params = useParams();
    const roomId = params.roomId as string;

    const onSubmit = async (values: { username: string }) => {
        // Navigate to the room with the provided name
        router.push(`/room/${roomId}?username=${encodeURIComponent(values.username)}`);
    };

    return (
        <PreJoin
            onSubmit={onSubmit}
            defaults={{
                username: '',
                videoEnabled: true,
                audioEnabled: true,
            }}
            persistUserChoices={true}
        />
    );
}