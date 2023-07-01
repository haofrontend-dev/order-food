const crypto = require('crypto')

import { Key} from '../../types/config_type'

export default {
    randomPublicKey: () => {
        
        // Public key
        const public_key = crypto.randomBytes(32).toString('hex')

        // Private Key
        const private_key = crypto.randomBytes(32).toString('hex')

        const all_key: Key = {
            public_key,
            private_key
        }

        return all_key
    } 
}