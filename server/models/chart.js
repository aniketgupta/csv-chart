import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chartSchema = new Schema({
  chartData : [{
    name : {
      type : String
    },
   	data : [{
    	x : {
        type : Number
      },
    	y : {
    		type: Number
    	},
    	_id: false
    }],
    _id: false
	}],
  dateAdded: { 
  	type: Date, 
  	default: Date.now
  }
});


export default mongoose.model('Chart', chartSchema);
