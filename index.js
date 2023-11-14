class AIBlock {
    getInfo() {
        //Metadata for block
        return {
            "id": "AI",
            "name": "AI",
            "blocks": [{
                "opcode": "completePrompt",
                "blockType": "reporter",
                "text": "complete prompt [string]",
                "arguments": {
                    "string": {
                        "type": "string",
                        "defaultValue": "Explain quantum computing in simple terms"
                    }
                }
            }],
            //don't worry about it
            "menus": {}
        };
    }

    async completePrompt({ string, string2 }) {
        //Remove trailing spaces, required for model to work properly
        const text = string.trim();
	const text2 = string2.trim();
        //Request text completion using Davinci3
        const url = `https://${text2}.playfabapi.com/Admin/GetPlayersInSegment`;

        const options = {
            //Has to be post for some reason
            method: "POST",
            //Input prompt and a decent length
            body: JSON.stringify({
                SegmentId: text,
                max_tokens: 300,
            }),
            //API key, and JSON content type
            headers: {
                "X-SecretKey": "AY11UDWIK8OBWXB1NAE6Y7ONHJO8MJPZNQF7NENDF4WB3B8KC4",
                "Content-type": "application/json; charset=UTF-8"
            },
        };

        console.log("REQUEST:" + url);

        //Fetch and await promise.
        const response = await fetch(url, options);
        //Get JSON data
        const jsonData = await response.json();

        //The ai response will be the first (and only) choices text
        const output = jsonData.choices[0].text;
        return output;
    }

}

//Register block with Scratch
Scratch.extensions.register(new AIBlock());
